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

package co.cask.cdap.metadata.elastic;

import co.cask.cdap.api.metadata.MetadataEntity;
import co.cask.cdap.api.metadata.MetadataScope;
import co.cask.cdap.common.conf.CConfiguration;
import co.cask.cdap.spi.metadata.Metadata;
import co.cask.cdap.spi.metadata.MetadataKind;
import co.cask.cdap.spi.metadata.MetadataMutation.Drop;
import co.cask.cdap.spi.metadata.MetadataMutation.Update;
import co.cask.cdap.spi.metadata.MetadataRecord;
import co.cask.cdap.spi.metadata.MetadataStorage;
import co.cask.cdap.spi.metadata.MetadataStorageTest;
import co.cask.cdap.spi.metadata.ScopedName;
import co.cask.cdap.spi.metadata.ScopedNameOfKind;
import co.cask.cdap.spi.metadata.SearchRequest;
import co.cask.cdap.spi.metadata.SearchResponse;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableSet;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class ElasticsearchMetadataStorageTest extends MetadataStorageTest {

  private static final Logger LOG = LoggerFactory.getLogger(ElasticsearchMetadataStorageTest.class);

  private static ElasticsearchMetadataStorage elasticStore;

  @Override
  protected MetadataStorage getMetadataStorage() {
    return elasticStore;
  }

  @BeforeClass
  public static void createIndex() throws IOException {
    CConfiguration cConf = CConfiguration.create();
    cConf.set(ElasticsearchMetadataStorage.CONF_ELASTIC_INDEX_NAME,
              "idx" + new Random(System.currentTimeMillis()).nextInt());
    cConf.setBoolean(ElasticsearchMetadataStorage.CONF_ELASTIC_WAIT_FOR_MUTATIONS, true);
    cConf.set(ElasticsearchMetadataStorage.CONF_ELASTIC_SCROLL_TIMEOUT, "2s");
    cConf.setInt(ElasticsearchMetadataStorage.CONF_ELASTIC_NUM_REPLICAS, 1);
    cConf.setInt(ElasticsearchMetadataStorage.CONF_ELASTIC_NUM_SHARDS, 1);
    cConf.setInt(ElasticsearchMetadataStorage.CONF_ELASTIC_WINDOW_SIZE, 128);
    String elasticPort = System.getProperty("elastic.http.port");
    if (elasticPort != null && !elasticPort.isEmpty()) {
      LOG.info("Elasticsearch port is {}", elasticPort);
      cConf.set(ElasticsearchMetadataStorage.CONF_ELASTIC_HOSTS, "localhost:" + elasticPort);
    }
    elasticStore = new ElasticsearchMetadataStorage(cConf);
    elasticStore.createIndex();
  }

  @AfterClass
  public static void dropIndex() throws IOException {
    if (elasticStore != null) {
      try {
        elasticStore.dropIndex();
      } finally {
        elasticStore.close();
      }
    }
  }

  @Test
  public void testFiltering() {
    ScopedName sys = new ScopedName(MetadataScope.SYSTEM, "s");
    ScopedName user = new ScopedName(MetadataScope.USER, "u");
    String sval = "S";
    String uval = "U";
    Metadata before = new Metadata(tags(sys, user), props(sys, sval, user, uval));

    // test selection to remove
    Assert.assertEquals(new Metadata(tags(sys), props(user, uval)),
                        ElasticsearchMetadataStorage.filterMetadata(
                          before,
                          ElasticsearchMetadataStorage.DISCARD,
                          MetadataKind.NONE,
                          MetadataScope.NONE,
                          ImmutableSet.of(new ScopedNameOfKind(MetadataKind.TAG, user),
                                          new ScopedNameOfKind(MetadataKind.PROPERTY, sys))));

    // test selection is not affected by scopes or kinds
    Assert.assertEquals(new Metadata(tags(sys), props(user, uval)),
                        ElasticsearchMetadataStorage.filterMetadata(
                          before,
                          ElasticsearchMetadataStorage.DISCARD,
                          MetadataKind.ALL,
                          MetadataScope.ALL,
                          ImmutableSet.of(new ScopedNameOfKind(MetadataKind.TAG, user),
                                          new ScopedNameOfKind(MetadataKind.PROPERTY, sys))));

    // test selection to keep
    Assert.assertEquals(new Metadata(tags(user), props(sys, sval)),
                        ElasticsearchMetadataStorage.filterMetadata(
                          before,
                          ElasticsearchMetadataStorage.KEEP,
                          MetadataKind.NONE,
                          MetadataScope.NONE,
                          ImmutableSet.of(new ScopedNameOfKind(MetadataKind.TAG, user),
                                          new ScopedNameOfKind(MetadataKind.PROPERTY, sys))));

    // test selection is not affected by scopes or kinds
    Assert.assertEquals(new Metadata(tags(user), props(sys, sval)),
                        ElasticsearchMetadataStorage.filterMetadata(
                          before,
                          ElasticsearchMetadataStorage.KEEP,
                          MetadataKind.ALL,
                          MetadataScope.ALL,
                          ImmutableSet.of(new ScopedNameOfKind(MetadataKind.TAG, user),
                                          new ScopedNameOfKind(MetadataKind.PROPERTY, sys))));

    // test removing nothing
    Assert.assertEquals(before,
                        ElasticsearchMetadataStorage.filterMetadata(
                          before,
                          ElasticsearchMetadataStorage.DISCARD,
                          MetadataKind.NONE,
                          MetadataScope.NONE,
                          null));
    Assert.assertEquals(before,
                        ElasticsearchMetadataStorage.filterMetadata(
                          before,
                          ElasticsearchMetadataStorage.DISCARD,
                          MetadataKind.NONE,
                          MetadataScope.ALL,
                          null));
    Assert.assertEquals(before,
                        ElasticsearchMetadataStorage.filterMetadata(
                          before,
                          ElasticsearchMetadataStorage.DISCARD,
                          MetadataKind.ALL,
                          MetadataScope.NONE,
                          null));

    // test keeping all
    Assert.assertEquals(before,
                        ElasticsearchMetadataStorage.filterMetadata(
                          before,
                          ElasticsearchMetadataStorage.KEEP,
                          MetadataKind.ALL,
                          MetadataScope.ALL,
                          null));

    // test removing all
    Assert.assertEquals(Metadata.EMPTY,
                        ElasticsearchMetadataStorage.filterMetadata(
                          before,
                          ElasticsearchMetadataStorage.DISCARD,
                          MetadataKind.ALL,
                          MetadataScope.ALL,
                          null));

    // test keeping nothing
    Assert.assertEquals(Metadata.EMPTY,
                        ElasticsearchMetadataStorage.filterMetadata(
                          before,
                          ElasticsearchMetadataStorage.KEEP,
                          MetadataKind.NONE,
                          MetadataScope.NONE,
                          null));
    // test keeping nothing
    Assert.assertEquals(Metadata.EMPTY,
                        ElasticsearchMetadataStorage.filterMetadata(
                          before,
                          ElasticsearchMetadataStorage.KEEP,
                          MetadataKind.ALL,
                          MetadataScope.NONE,
                          null));
    // test keeping nothing
    Assert.assertEquals(Metadata.EMPTY,
                        ElasticsearchMetadataStorage.filterMetadata(
                          before,
                          ElasticsearchMetadataStorage.KEEP,
                          MetadataKind.NONE,
                          MetadataScope.ALL,
                          null));

    // test removing all SYSTEM
    Assert.assertEquals(new Metadata(tags(user), props(user, uval)),
                        ElasticsearchMetadataStorage.filterMetadata(
                          before,
                          ElasticsearchMetadataStorage.DISCARD,
                          MetadataKind.ALL,
                          Collections.singleton(MetadataScope.SYSTEM),
                          null));
    // test removing all USER
    Assert.assertEquals(new Metadata(tags(sys), props(sys, sval)),
                        ElasticsearchMetadataStorage.filterMetadata(
                          before,
                          ElasticsearchMetadataStorage.DISCARD,
                          MetadataKind.ALL,
                          Collections.singleton(MetadataScope.USER),
                          null));
    // test keeping all SYSTEM
    Assert.assertEquals(new Metadata(tags(sys), props(sys, sval)),
                        ElasticsearchMetadataStorage.filterMetadata(
                          before,
                          ElasticsearchMetadataStorage.KEEP,
                          MetadataKind.ALL,
                          Collections.singleton(MetadataScope.SYSTEM),
                          null));
    // test keeping all USER
    Assert.assertEquals(new Metadata(tags(user), props(user, uval)),
                        ElasticsearchMetadataStorage.filterMetadata(
                          before,
                          ElasticsearchMetadataStorage.KEEP,
                          MetadataKind.ALL,
                          Collections.singleton(MetadataScope.USER),
                          null));

    // test removing all tags
    Assert.assertEquals(new Metadata(tags(), props(sys, sval, user, uval)),
                        ElasticsearchMetadataStorage.filterMetadata(
                          before,
                          ElasticsearchMetadataStorage.DISCARD,
                          Collections.singleton(MetadataKind.TAG),
                          MetadataScope.ALL,
                          null));

    // test removing all properties
    Assert.assertEquals(new Metadata(tags(sys, user), props()),
                        ElasticsearchMetadataStorage.filterMetadata(
                          before,
                          ElasticsearchMetadataStorage.DISCARD,
                          Collections.singleton(MetadataKind.PROPERTY),
                          MetadataScope.ALL,
                          null));

    // test keeping all tags
    Assert.assertEquals(new Metadata(tags(sys, user), props()),
                        ElasticsearchMetadataStorage.filterMetadata(
                          before,
                          ElasticsearchMetadataStorage.KEEP,
                          Collections.singleton(MetadataKind.TAG),
                          MetadataScope.ALL,
                          null));

    // test keeping all properties
    Assert.assertEquals(new Metadata(tags(), props(sys, sval, user, uval)),
                        ElasticsearchMetadataStorage.filterMetadata(
                          before,
                          ElasticsearchMetadataStorage.KEEP,
                          Collections.singleton(MetadataKind.PROPERTY),
                          MetadataScope.ALL,
                          null));

    // test removing all tags in SYSTEM scope
    Assert.assertEquals(new Metadata(tags(user), props(sys, sval, user, uval)),
                        ElasticsearchMetadataStorage.filterMetadata(
                          before,
                          ElasticsearchMetadataStorage.DISCARD,
                          Collections.singleton(MetadataKind.TAG),
                          Collections.singleton(MetadataScope.SYSTEM),
                          null));

    // test removing all properties in USER scope
    Assert.assertEquals(new Metadata(tags(sys, user), props(sys, sval)),
                        ElasticsearchMetadataStorage.filterMetadata(
                          before,
                          ElasticsearchMetadataStorage.DISCARD,
                          Collections.singleton(MetadataKind.PROPERTY),
                          Collections.singleton(MetadataScope.USER),
                          null));

    // test keeping all tags in SYSTEM scope
    Assert.assertEquals(new Metadata(tags(sys), props()),
                        ElasticsearchMetadataStorage.filterMetadata(
                          before,
                          ElasticsearchMetadataStorage.KEEP,
                          Collections.singleton(MetadataKind.TAG),
                          Collections.singleton(MetadataScope.SYSTEM),
                          null));

    // test keeping all properties in USER scope
    Assert.assertEquals(new Metadata(tags(), props(user, uval)),
                        ElasticsearchMetadataStorage.filterMetadata(
                          before,
                          ElasticsearchMetadataStorage.KEEP,
                          Collections.singleton(MetadataKind.PROPERTY),
                          Collections.singleton(MetadataScope.USER),
                          null));
  }

  @Override
  protected List<String> getAdditionalTTLQueries() {
    return ImmutableList.of("ttl:0003600", "TtL:03600", "TtL:03600.00");
  }

  @Test
  public void testScrollTimeout() throws IOException, InterruptedException {
    MetadataStorage mds = getMetadataStorage();

    List<MetadataRecord> records = IntStream.range(0, 20).boxed().map(i -> new MetadataRecord(
      MetadataEntity.ofDataset("ns" + i, "ds" + i),
      new Metadata(MetadataScope.USER, tags("tag", "t" + i), props("p", "v" + i)))).collect(Collectors.toList());
    mds.batch(records.stream().map(r -> new Update(r.getEntity(), r.getMetadata())).collect(Collectors.toList()));

    SearchRequest request = SearchRequest.of("t*").setCursorRequested(true).setLimit(5).build();
    SearchResponse response = mds.search(request);
    Assert.assertEquals(5, response.getResults().size());
    Assert.assertNotNull(response.getCursor());

    SearchRequest request2 = SearchRequest.of("t*").setCursor(response.getCursor()).build();
    SearchResponse response2 = mds.search(request2);
    Assert.assertEquals(5, response.getResults().size());

    // sleep 1 sec longer than the configured scroll timeout to invalidate cursor
    TimeUnit.SECONDS.sleep(3);
    SearchResponse response3 = mds.search(request2);
    Assert.assertEquals(response2, response3);

    // create a nonsense cursor and search with that
    Cursor cursor = Cursor.fromString(response.getCursor());
    cursor = new Cursor(cursor.getOffset(), cursor.getPageSize(), "nosuchcursor");
    SearchRequest request4 = SearchRequest.of("t*").setCursor(cursor.toString()).build();
    SearchResponse response4 = mds.search(request4);
    // compare only the results, not the entire response (the cursor is different)
    Assert.assertEquals(response2.getResults(), response4.getResults());

    // clean up
    mds.batch(records.stream().map(MetadataRecord::getEntity).map(Drop::new).collect(Collectors.toList()));
  }

  @Override
  protected void validateCursor(String cursor, int expectedOffset, int expectedPageSize) {
    Cursor c = Cursor.fromString(cursor);
    Assert.assertEquals(expectedOffset, c.getOffset());
    Assert.assertEquals(expectedPageSize, c.getPageSize());
  }
}
