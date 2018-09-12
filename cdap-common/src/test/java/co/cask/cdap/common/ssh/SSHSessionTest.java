/*
 * Copyright © 2018 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

package co.cask.cdap.common.ssh;


import co.cask.cdap.runtime.spi.ssh.PortForwarding;
import co.cask.cdap.runtime.spi.ssh.SSHSession;
import com.google.common.base.Splitter;
import com.google.common.io.Closeables;
import com.google.common.util.concurrent.AbstractExecutionThreadService;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.KeyPair;
import org.apache.sshd.server.Command;
import org.apache.sshd.server.Environment;
import org.apache.sshd.server.ExitCallback;
import org.apache.sshd.server.SshServer;
import org.apache.sshd.server.config.keys.AuthorizedKeysAuthenticator;
import org.apache.sshd.server.forward.AcceptAllForwardingFilter;
import org.apache.sshd.server.keyprovider.SimpleGeneratorHostKeyProvider;
import org.apache.sshd.server.scp.ScpCommandFactory;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.ClassRule;
import org.junit.Test;
import org.junit.rules.TemporaryFolder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Unit tests for {@link SSHSession}.
 */
public class SSHSessionTest {

  @ClassRule
  public static final TemporaryFolder TEMP_FOLDER = new TemporaryFolder();

  private static SshServer sshd;
  private static KeyPair keyPair;

  @BeforeClass
  public static void init() throws IOException, JSchException {
    keyPair = KeyPair.genKeyPair(new JSch(), KeyPair.RSA, 1024);

    File authorizedKeysFile = TEMP_FOLDER.newFile();
    keyPair.writePublicKey(authorizedKeysFile.getAbsolutePath(), "cdap@cask.co");

    sshd = SshServer.setUpDefaultServer();
    sshd.setHost(InetAddress.getLoopbackAddress().getCanonicalHostName());
    sshd.setPort(0);
    sshd.setForwardingFilter(AcceptAllForwardingFilter.INSTANCE);
    sshd.setKeyPairProvider(new SimpleGeneratorHostKeyProvider());
    sshd.setPublickeyAuthenticator(new AuthorizedKeysAuthenticator(authorizedKeysFile));
    // Support SCP and a CommandFactory that always response back the request command
    sshd.setCommandFactory(new ScpCommandFactory.Builder().withDelegate(command -> new Command() {

      private OutputStream out;
      private OutputStream err;
      private ExitCallback callback;

      @Override
      public void setInputStream(InputStream in) {
      }

      @Override
      public void setOutputStream(OutputStream out) {
        this.out = out;
      }

      @Override
      public void setErrorStream(OutputStream err) {
        this.err = err;
      }

      @Override
      public void setExitCallback(ExitCallback callback) {
        this.callback = callback;
      }

      @Override
      public void start(Environment env) throws IOException {
        // Just echo the command back and terminate

        // If the command contains "fail", then echo back to the error stream with non-zero exit code
        boolean failure = command.contains("fail");
        OutputStream output = failure ? err : out;
        output.write(command.getBytes(StandardCharsets.UTF_8));
        output.flush();

        callback.onExit(failure ? 1 : 0);
      }

      @Override
      public void destroy() throws Exception {

      }
    }).build());

    sshd.start();
  }

  @AfterClass
  public static void finish() throws IOException {
    sshd.stop();
  }

  @Test
  public void testScp() throws Exception {
    SSHConfig config = getSSHConfig();

    // Generate some content
    File file = TEMP_FOLDER.newFile();
    try (BufferedWriter writer = Files.newBufferedWriter(file.toPath(), StandardCharsets.UTF_8)) {
      for (int i = 0; i < 10; i++) {
        writer.write("Message " + i);
        writer.newLine();
      }
    }

    // SCP the file to the given directory
    File targetFolder = TEMP_FOLDER.newFolder();
    try (SSHSession session = new DefaultSSHSession(config)) {
      session.copy(file.toPath(), targetFolder.getAbsolutePath());
    }

    // Verify
    File uploadedFile = new File(targetFolder, file.getName());
    Assert.assertTrue(uploadedFile.exists());
    Assert.assertArrayEquals(Files.readAllBytes(file.toPath()), Files.readAllBytes(uploadedFile.toPath()));
  }

  @Test
  public void testSsh() throws Exception {
    SSHConfig config = getSSHConfig();

    try (SSHSession session = new DefaultSSHSession(config)) {
      for (int i = 0; i < 10; i++) {
        String msg = "Sending some message " + i;
        String result = session.executeAndWait(msg);
        Assert.assertEquals(msg, result);
      }
    }

    // Test the error exit
    try (SSHSession session = new DefaultSSHSession(config)) {
      try {
        session.executeAndWait("failure");
        Assert.fail("Expected failure from ssh command");
      } catch (Exception e) {
        // Expected
      }
    }
  }

  @Test
  public void testLocalPortForwarding() throws Exception {
    // Starts an echo server for testing the port forwarding
    EchoServer echoServer = new EchoServer();

    echoServer.startAndWait();
    try {
      // Creates the DataConsumer for receiving data and validating the lifecycle
      StringBuilder received = new StringBuilder();
      AtomicBoolean finished = new AtomicBoolean();

      PortForwarding.DataConsumer dataConsumer = new PortForwarding.DataConsumer() {
        private final List<String> messages = new ArrayList<>();

        @Override
        public void received(ByteBuffer buffer) {
          messages.add(StandardCharsets.UTF_8.decode(buffer).toString());
        }

        @Override
        public synchronized void flushed() {
          messages.forEach(received::append);
        }

        @Override
        public void finished() {
          finished.set(true);
        }
      };


      SSHConfig sshConfig = getSSHConfig();

      // Creates a SSH session.
      try (SSHSession session = new DefaultSSHSession(sshConfig)) {
        InetSocketAddress bindAddress = echoServer.getBindAddress();

        // Creates local port forward and send data to the echo server through that forwarding channel
        try (PortForwarding portForwarding = session.createLocalPortForward(bindAddress.getHostName(),
                                                                            bindAddress.getPort(),
                                                                            12345, dataConsumer)) {
          List<String> messages = new ArrayList<>();
          for (int i = 0; i < 10; i++) {
            String msg = "Testing" + i;
            portForwarding.write(StandardCharsets.UTF_8.encode(msg));
            portForwarding.write(StandardCharsets.UTF_8.encode("\n"));
            messages.add(msg);
          }
          portForwarding.flush();

          Iterable<String> splits = Splitter.on("\n").omitEmptyStrings().split(received);
          Assert.assertEquals(messages, StreamSupport.stream(splits.spliterator(), false).collect(Collectors.toList()));
        }

        // After closing the port forwarding, the data consumer should have finished.
        Assert.assertTrue(finished.get());
      }

    } finally {
      echoServer.stopAndWait();
    }
  }

  @Test
  public void testForwardingOnSessionClose() throws Exception {
    EchoServer echoServer = new EchoServer();

    echoServer.startAndWait();
    try {
      SSHConfig sshConfig = getSSHConfig();
      AtomicBoolean finished = new AtomicBoolean(false);
      PortForwarding portForwarding;

      // Creates a SSH session
      try (SSHSession session = new DefaultSSHSession(sshConfig)) {
        InetSocketAddress bindAddress = echoServer.getBindAddress();

        // Creates a port forwarding and send some data
        BlockingQueue<String> received = new LinkedBlockingQueue<>();
        portForwarding = session.createLocalPortForward(bindAddress.getHostName(), bindAddress.getPort(),
                                                        12345, new PortForwarding.DataConsumer() {
          @Override
          public void received(ByteBuffer buffer) {
            received.add(StandardCharsets.UTF_8.decode(buffer).toString());
          }

          @Override
          public void finished() {
            finished.set(true);
          }
        });

        portForwarding.write(StandardCharsets.UTF_8.encode("Testing"));
        portForwarding.flush();

        Assert.assertEquals("Testing", received.poll(5, TimeUnit.SECONDS));
      }

      // After closing of the SSH session, the port forwarding should be closed as well
      Assert.assertTrue(finished.get());

      // Writing to a closed port forwarding should fails.
      try {
        portForwarding.write(StandardCharsets.UTF_8.encode("Testing 2"));
        Assert.fail("Expected failure when writing to closed PortForwarding");
      } catch (IOException e) {
        // expected
      }

    } finally {
      echoServer.stopAndWait();
    }
  }

  private SSHConfig getSSHConfig() {
    return SSHConfig.builder(sshd.getHost())
      .setUser("cdap")
      .setPort(sshd.getPort())
      .setPrivateKeySupplier(() -> {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        keyPair.writePrivateKey(bos, null);
        return bos.toByteArray();
      })
      .build();
  }

  /**
   * A simple Echo server for testing.
   */
  private static final class EchoServer extends AbstractExecutionThreadService {

    private static final Logger LOG = LoggerFactory.getLogger(EchoServer.class);

    private ServerSocket serverSocket;
    private volatile boolean stopped;

    InetSocketAddress getBindAddress() {
      return (InetSocketAddress) serverSocket.getLocalSocketAddress();
    }

    @Override
    protected void startUp() throws Exception {
      serverSocket = new ServerSocket();
      serverSocket.bind(new InetSocketAddress(InetAddress.getLoopbackAddress(), 0));
    }

    @Override
    protected void run() throws IOException {
      while (!stopped) {
        try {
          Socket socket = serverSocket.accept();
          Thread t = new Thread(() -> {
            byte[] buffer = new byte[1024];
            try {
              InputStream is = socket.getInputStream();
              OutputStream os = socket.getOutputStream();

              int len = is.read(buffer);
              while (len > 0) {
                os.write(buffer, 0, len);
                os.flush();
                len = is.read(buffer);
              }
            } catch (IOException e) {
              LOG.error("Exception raised from the EchoServer handling thread", e);
            } finally {
              Closeables.closeQuietly(socket);
            }
          });

          t.setName("EchoServerHandler " + socket.getPort());
          t.start();
        } catch (IOException e) {
          if (!stopped) {
            throw e;
          }
        }
      }
    }

    @Override
    protected void triggerShutdown() {
      stopped = true;
      Closeables.closeQuietly(serverSocket);
    }
  }
}
