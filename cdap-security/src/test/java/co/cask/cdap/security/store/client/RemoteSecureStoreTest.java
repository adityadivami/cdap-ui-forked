/*
 * Copyright © 2019 Cask Data, Inc.
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

package co.cask.cdap.security.store.client;

import co.cask.cdap.api.security.store.SecureStoreData;
import co.cask.cdap.api.security.store.SecureStoreMetadata;
import co.cask.cdap.common.HttpExceptionHandler;
import co.cask.cdap.common.SecureKeyNotFoundException;
import co.cask.cdap.common.conf.CConfiguration;
import co.cask.cdap.common.conf.Constants;
import co.cask.cdap.common.conf.SConfiguration;
import co.cask.cdap.common.namespace.InMemoryNamespaceAdmin;
import co.cask.cdap.proto.NamespaceMeta;
import co.cask.cdap.security.store.FileSecureStoreService;
import co.cask.cdap.security.store.SecureStoreHandler;
import co.cask.http.NettyHttpService;
import com.google.common.collect.ImmutableMap;
import org.apache.twill.discovery.Discoverable;
import org.apache.twill.discovery.InMemoryDiscoveryService;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.ClassRule;
import org.junit.Test;
import org.junit.rules.TemporaryFolder;

import java.nio.charset.StandardCharsets;
import java.util.Map;

/**
 * Tests for {@link RemoteSecureStore}.
 */
public class RemoteSecureStoreTest {
  @ClassRule
  public static final TemporaryFolder TEMP_FOLDER = new TemporaryFolder();

  private static final String NAMESPACE1 = "ns1";
  private static NettyHttpService httpService;
  private static RemoteSecureStore remoteSecureStore;

  @BeforeClass
  public static void setUp() throws Exception {
    CConfiguration conf = CConfiguration.create();
    conf.set(Constants.Security.Store.FILE_PATH, TEMP_FOLDER.newFolder().getAbsolutePath());
    SConfiguration sConf = SConfiguration.create();
    sConf.set(Constants.Security.Store.FILE_PASSWORD, "secret");
    InMemoryNamespaceAdmin namespaceClient = new InMemoryNamespaceAdmin();

    NamespaceMeta namespaceMeta = new NamespaceMeta.Builder()
      .setName(NAMESPACE1)
      .build();
    namespaceClient.create(namespaceMeta);

    FileSecureStoreService fileSecureStoreService = new FileSecureStoreService(conf, sConf, namespaceClient);
    // Starts a mock server to handle remote secure store requests
    httpService = NettyHttpService.builder("remoteSecureStoreTest")
      .setHttpHandlers(new SecureStoreHandler(fileSecureStoreService, fileSecureStoreService))
      .setExceptionHandler(new HttpExceptionHandler())
      .build();

    httpService.start();

    InMemoryDiscoveryService discoveryService = new InMemoryDiscoveryService();
    discoveryService.register(new Discoverable(Constants.Service.SECURE_STORE_SERVICE, httpService.getBindAddress()));

    remoteSecureStore = new RemoteSecureStore(discoveryService);
  }

  @AfterClass
  public static void cleanUp() throws Exception {
    httpService.stop();
  }

  @Test
  public void testRemoteSecureStore() throws Exception {
    SecureStoreMetadata secureStoreMetadata = new SecureStoreMetadata("key", "description", 1,
                                                                      ImmutableMap.of("prop1", "value1"));
    SecureStoreData secureStoreData = new SecureStoreData(secureStoreMetadata,
                                                          "value".getBytes(StandardCharsets.UTF_8));

    // test put and get
    remoteSecureStore.putSecureData(NAMESPACE1, "key", "value", "description", ImmutableMap.of("prop1", "value1"));
    SecureStoreData actual = remoteSecureStore.getSecureData(NAMESPACE1, "key");
    Assert.assertEquals(secureStoreMetadata.getName(), actual.getMetadata().getName());
    Assert.assertArrayEquals(secureStoreData.get(), actual.get());
    Assert.assertEquals(secureStoreMetadata.getDescription(), actual.getMetadata().getDescription());
    Assert.assertEquals(secureStoreMetadata.getProperties().size(), actual.getMetadata().getProperties().size());

    // test list
    Map<String, String> secureData = remoteSecureStore.listSecureData(NAMESPACE1);
    Assert.assertEquals(1, secureData.size());
    Map.Entry<String, String> entry = secureData.entrySet().iterator().next();
    Assert.assertEquals("key", entry.getKey());
    Assert.assertEquals("description", entry.getValue());

    // test delete
    remoteSecureStore.deleteSecureData(NAMESPACE1, "key");
    Assert.assertEquals(0, remoteSecureStore.listSecureData(NAMESPACE1).size());
  }

  @Test(expected = SecureKeyNotFoundException.class)
  public void testKeyNotFound() throws Exception {
    remoteSecureStore.getSecureData(NAMESPACE1, "nonexistingkey");
  }
}
