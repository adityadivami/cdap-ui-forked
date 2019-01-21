/*
 * Copyright © 2016-2019 Cask Data, Inc.
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
package co.cask.cdap.etl.batch.customaction;

import co.cask.cdap.api.TxRunnable;
import co.cask.cdap.api.customaction.CustomActionContext;
import co.cask.cdap.api.security.store.SecureStoreData;
import co.cask.cdap.api.security.store.SecureStoreMetadata;
import co.cask.cdap.etl.api.action.ActionContext;
import co.cask.cdap.etl.api.lineage.field.FieldOperation;
import co.cask.cdap.etl.common.AbstractStageContext;
import co.cask.cdap.etl.common.PipelineRuntime;
import co.cask.cdap.etl.proto.v2.spec.StageSpec;
import org.apache.tephra.TransactionFailureException;

import java.util.List;
import java.util.Map;
import javax.annotation.Nullable;

/**
 * Default implementation for the {@link ActionContext}.
 */
public class BasicActionContext extends AbstractStageContext implements ActionContext  {

  private final CustomActionContext context;

  public BasicActionContext(CustomActionContext context, PipelineRuntime pipelineRuntime, StageSpec stageSpec) {
    super(pipelineRuntime, stageSpec);
    this.context = context;
  }

  @Override
  public void execute(TxRunnable runnable) throws TransactionFailureException {
    context.execute(runnable);
  }

  @Override
  public void execute(int timeout, TxRunnable runnable) throws TransactionFailureException {
    context.execute(timeout, runnable);
  }

  @Override
  public List<SecureStoreMetadata> list(String namespace) throws Exception {
    return context.list(namespace);
  }

  @Override
  public SecureStoreData get(String namespace, String name) throws Exception {
    return context.get(namespace, name);
  }

  @Override
  public void put(String namespace, String name, String data, @Nullable String description,
                  Map<String, String> properties) throws Exception {
    context.getAdmin().put(namespace, name, data, description, properties);
  }

  @Override
  public void delete(String namespace, String name) throws Exception {
    context.getAdmin().delete(namespace, name);
  }

  @Override
  public void record(List<FieldOperation> fieldOperations) {
    throw new UnsupportedOperationException("Lineage recording is not supported.");
  }
}
