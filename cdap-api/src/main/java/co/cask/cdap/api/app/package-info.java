/*
 * Copyright © 2014-2016 Cask Data, Inc.
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

/**
 * An Application is a logical grouping of
 * {@link co.cask.cdap.api.data.stream.Stream Streams},
 * {@link co.cask.cdap.api.dataset.Dataset Datasets},
 * {@link co.cask.cdap.api.flow.Flow Flows},
 * and other deployable elements.
 *
 * <h1>Application</h1>
 *
 * <p>
 * Every Application must either implement the {@link co.cask.cdap.api.app.Application} 
 * interface or extend the {@link co.cask.cdap.api.app.AbstractApplication} class. 
 * Extending AbstractApplication is simpler and helps produce cleaner code.
 * </p>
 *
 * <p>
 * To create a CDAP Application, first begin by extending the
 * {@link co.cask.cdap.api.app.AbstractApplication} class, then implement its 
 * {@link co.cask.cdap.api.app.Application#configure(ApplicationConfigurer configurer, ApplicationContext context)
 * configure()} method. In the configure method, specify the Application's metadata
 * (its name and description), and declare and configure each of the Application elements.
 * </p>
 *
 * <p>
 * Example usage:
 * </p>
 *
 * <pre>
 * <code>
 * public class MyApp extends AbstractApplication {
 *   {@literal @}Override
 *   public void configure() {
 *     setName("myApp");
 *     setDescription("My Sample Application");
 *     createDataset("myCounters", "KeyValueTable");
 *     addSpark(new MySparkJob());
 *     addMapReduce(new MyMapReduceJob());
 *     addWorkflow(new MyAppWorkflow());
 *   }
 * }
 * </code>
 * </pre>
 * </p>
 *
 * <h1>Dataset</h1>
 *
 * <p>
 * A {@link co.cask.cdap.api.dataset.Dataset Dataset} defines the storage and
 * retrieval of data. In addition to the several Dataset implementations CDAP
 * provides, you can also implement your own Custom Datasets.
 * </p>
 *
 * <p>
 * See {@link co.cask.cdap.api.dataset.Dataset} for details.
 * </p>
 *
 * <h1>Spark</h1>
 *
 * <p>
 *   A {@link co.cask.cdap.api.spark.Spark} program defines the processing
 *   of data using Spark.
 * </p>
 *
 * <h1>MapReduce</h1>
 *
 * <p>
 *   A {@link co.cask.cdap.api.mapreduce.MapReduce} program to process in batch
 *   using MapReduce
 * </p>
 *
 * <h1>Workflow</h1>
 *
 * <p>
 *   A {@link co.cask.cdap.api.workflow.Workflow} program to orchestrate a series
 *   of mapreduce or spark jobs.
 * </p>
 */
package co.cask.cdap.api.app;
