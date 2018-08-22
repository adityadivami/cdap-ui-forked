/*
 * Copyright © 2014 Cask Data, Inc.
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
package co.cask.cdap.common.http;

import co.cask.cdap.common.HttpExceptionHandler;
import co.cask.cdap.common.conf.CConfiguration;
import co.cask.cdap.common.conf.Constants;
import co.cask.http.ChannelPipelineModifier;
import co.cask.http.NettyHttpService;
import io.netty.channel.ChannelPipeline;
import io.netty.util.concurrent.EventExecutor;

import javax.annotation.Nullable;

/**
 * Provides a {@link co.cask.http.NettyHttpService.Builder} that has common settings built-in.
 */
public class CommonNettyHttpServiceBuilder extends NettyHttpService.Builder {

  private ChannelPipelineModifier pipelineModifier;
  private ChannelPipelineModifier additionalModifier;

  public CommonNettyHttpServiceBuilder(CConfiguration cConf, String serviceName) {
    super(serviceName);

    if (cConf.getBoolean(Constants.Security.ENABLED)) {
      pipelineModifier = new ChannelPipelineModifier() {
        @Override
        public void modify(ChannelPipeline pipeline) {
          // Adds the AuthenticationChannelHandler before the dispatcher, using the same
          // EventExecutor to make sure they get invoked from the same thread
          // This is needed before we use a InheritableThreadLocal in SecurityRequestContext
          // to remember the user id.
          EventExecutor executor = pipeline.context("dispatcher").executor();
          pipeline.addBefore(executor, "dispatcher", "authenticator", new AuthenticationChannelHandler());
        }
      };
    }
    this.setExceptionHandler(new HttpExceptionHandler());
  }

  @Override
  public NettyHttpService.Builder setChannelPipelineModifier(ChannelPipelineModifier channelPipelineModifier) {
    pipelineModifier = channelPipelineModifier;
    return this;
  }

  public NettyHttpService.Builder addChannelPipelineModifier(ChannelPipelineModifier additionalPipelineModifier) {
    additionalModifier = combine(additionalModifier, additionalPipelineModifier);
    return this;
  }

  @Override
  public NettyHttpService build() {
    ChannelPipelineModifier modifier = combine(pipelineModifier, additionalModifier);
    if (modifier != null) {
      super.setChannelPipelineModifier(modifier);
    }
    return super.build();
  }

  private ChannelPipelineModifier combine(@Nullable ChannelPipelineModifier existing,
                                          @Nullable ChannelPipelineModifier additional) {
    if (existing == null) {
      return additional;
    }
    if (additional == null) {
      return existing;
    }
    return new ChannelPipelineModifier() {
      @Override
      public void modify(ChannelPipeline pipeline) {
        existing.modify(pipeline);
        additional.modify(pipeline);
      }
    };
  }
}
