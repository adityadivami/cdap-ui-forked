/*
 * Copyright © 2015-2016 Cask Data, Inc.
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

package co.cask.cdap.store;

import co.cask.cdap.common.NotFoundException;
import co.cask.cdap.proto.NamespaceMeta;
import co.cask.cdap.proto.id.NamespaceId;
import co.cask.cdap.spi.data.StructuredTableContext;
import co.cask.cdap.spi.data.transaction.TransactionRunner;
import co.cask.cdap.spi.data.transaction.TransactionRunners;
import com.google.common.base.Preconditions;
import com.google.inject.Inject;

import java.util.List;
import javax.annotation.Nullable;

/**
 * Default implementation for {@link NamespaceStore}.
 */
public class DefaultNamespaceStore implements NamespaceStore {

  private final TransactionRunner transactionRunner;

  @Inject
  public DefaultNamespaceStore(TransactionRunner transactionRunner) {
    this.transactionRunner = transactionRunner;
  }

  private NamespaceMDSTable getNamespaceMDS(StructuredTableContext context) throws NotFoundException {
    return new NamespaceMDSTable(context);
  }

  @Override
  @Nullable
  public NamespaceMeta create(final NamespaceMeta metadata) {
    Preconditions.checkArgument(metadata != null, "Namespace metadata cannot be null.");
    return TransactionRunners.run(transactionRunner, context -> {
      NamespaceMDSTable mds = getNamespaceMDS(context);
      NamespaceMeta existing = mds.get(metadata.getNamespaceId());
      if (existing != null) {
        return existing;
      }
      mds.create(metadata);
      return null;
    });
  }

  @Override
  public void update(final NamespaceMeta metadata) {
    Preconditions.checkArgument(metadata != null, "Namespace metadata cannot be null.");
    TransactionRunners.run(transactionRunner, context -> {
      NamespaceMDSTable mds = getNamespaceMDS(context);
      NamespaceMeta existing = mds.get(metadata.getNamespaceId());
      if (existing != null) {
        mds.create(metadata);
      }
    });
  }

  @Override
  @Nullable
  public NamespaceMeta get(final NamespaceId id) {
    Preconditions.checkArgument(id != null, "Namespace id cannot be null.");
    return TransactionRunners.run(transactionRunner, context -> {
      return getNamespaceMDS(context).get(id);
    });
  }

  @Override
  @Nullable
  public NamespaceMeta delete(final NamespaceId id) {
    Preconditions.checkArgument(id != null, "Namespace id cannot be null.");
    return TransactionRunners.run(transactionRunner, context -> {
      NamespaceMDSTable mds = getNamespaceMDS(context);
      NamespaceMeta existing = mds.get(id);
      if (existing != null) {
        mds.delete(id);
      }
      return existing;
    });
  }

  @Override
  public List<NamespaceMeta> list() {
    return TransactionRunners.run(transactionRunner, context -> {
      return getNamespaceMDS(context).list();
    });
  }
}
