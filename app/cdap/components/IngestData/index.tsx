/*
 * Copyright © 2022 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain `a` copy of
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

import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { MyAppApi } from 'api/app';
import { MyArtifactApi } from 'api/artifact';
import { MyDatasetApi } from 'api/dataset';
import { MyProgramApi } from 'api/program';
import DataPrepStore from 'components/DataPrep/store/';
import getPipelineConfig from 'components/DataPrep/TopPanel/PipelineConfigHelper';
import DrawerWidget from 'components/DrawerWidget';
import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import React, { useEffect, useState } from 'react';
import { Observable } from 'rxjs/Observable';
import { objectQuery } from 'services/helpers';
import NamespaceStore from 'services/NamespaceStore';
import IngestBody from './Components/IngestBody';
import { CANCEL_BUTTON, INGEST_DATA_BUTTON, INGEST_DATA_HEADING } from './constants';
import { useStyles } from './styles';

export const fieldsetDataType = [
  {
    name: 'TPFSAvro',
    label: 'Avro',
  },
  {
    name: 'TPFSOrc',
    label: 'ORC',
  },
  {
    name: 'TPFSParquet',
    label: 'Parquet',
  },
];
declare global {
  interface Window {
    // ⚠️ notice that "Window" is capitalized here
    getAbsUIUrl: any;
  }
}

const IngestData = (props) => {
  const classes = useStyles();
  const { setOpenIngestData, headersNamesList } = props;
  const [openIngestDataDrawer, setOpenIngestDataDrawer] = useState();
  const [ingestDataToggle, setIngestDataToggle] = useState('fileset');
  const [datasetName, setDatasetName] = useState('');
  const [selectValueFileset, setSelectValueFileset] = useState(fieldsetDataType[0].name);
  const [selectValueTable, setSelectValueTable] = useState(headersNamesList[0].name);
  const [isDisableIngestDataButton, setIsDisableIngestDataButton] = useState(true);
  const [copyInProgress, setCopyInProgress] = useState(false);
  const [batchPipelineConfig, setBatchPipelineConfig] = useState<any>({});
  const [sinkPluginsForDataset, setSinkPluginsForDataset] = useState<any>({});
  const [error, setError] = useState(null);
  const [copyTaskStarted, setCopyTaskStarted] = useState(false);
  const [datasetUrl, setDatasetUrl] = useState({});
  const [copyingSteps, setCopyingSteps] = useState([
    {
      message: 'Preparing to copy...',
      error: 'Unable to copy data.',
      status: null,
    },
    {
      message: 'Submitting copy task...',
      error: 'Unable to submit copy task.',
      status: null,
    },
  ]);

  useEffect(() => {
    const { selectedNamespace: namespace } = NamespaceStore.getState();
    let corePlugins;
    MyArtifactApi.list({ namespace }).subscribe((res) => {
      corePlugins = find(res, { name: 'core-plugins' });
      if (corePlugins) {
        corePlugins.version = '[1.7.0, 3.0.0)';
      }
      const getPluginConfig = (pluginName) => {
        return {
          name: pluginName,
          plugin: {
            name: pluginName,
            label: pluginName,
            type: 'batchsink',
            artifact: corePlugins,
            properties: {},
          },
        };
      };
      const sinks = {
        TPFSAvro: getPluginConfig('TPFSAvro'),
        TPFSParquet: getPluginConfig('TPFSParquet'),
        TPFSOrc: getPluginConfig('TPFSOrc'),
        Table: getPluginConfig('Table'),
      };
      setSinkPluginsForDataset(sinks);

      // This functions was in toggle Modal Need to check
      getPipelineConfig().subscribe(
        (res) => {
          setBatchPipelineConfig(res.batchConfig);
        },
        (err) => {
          setError(err);
        }
      );
      // This functions was in toggle Modal Need to check
    });
  }, []);

  const closeIngestDataDrawerHandler = () => {
    setOpenIngestData(false);
  };

  const handleToggleChange = (event: React.MouseEvent<HTMLElement>, newtoggleData: string) => {
    if (newtoggleData !== null) {
      setIngestDataToggle(newtoggleData);
    }
  };

  const handleDatasetName = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.value.length > 0) {
      setIsDisableIngestDataButton(false);
    } else {
      setIsDisableIngestDataButton(true);
    }
    setDatasetName(event.target.value);
  };

  const handleSelectForFileset = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectValueFileset(event.target.value);
  };

  const handleSelectForTable = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectValueTable(event.target.value);
  };

  const handleCancel = (e) => {
    setOpenIngestData(false);
  };

  const getAppConfigMacros = () => {
    const { workspaceInfo, directives, headers } = DataPrepStore.getState().dataprep;
    const pipelineConfig = cloneDeep(batchPipelineConfig);
    const wranglerStage = pipelineConfig.config.stages.find((stage) => stage.name === 'Wrangler');
    const dbStage = pipelineConfig.config.stages.find((stage) => stage.name === 'Database');
    const kafkaStage = pipelineConfig.config.stages.find((stage) => stage.name === 'Kafka');
    let databaseConfig = objectQuery(workspaceInfo, 'properties', 'databaseConfig');
    const s3Stage = pipelineConfig.config.stages.find((stage) => stage.name === 'S3');
    const gcsStage = pipelineConfig.config.stages.find((stage) => stage.name === 'GCS');
    const bigqueryStage = pipelineConfig.config.stages.find(
      (stage) => stage.name === 'BigQueryTable'
    );
    const spannerStage = pipelineConfig.config.stages.find((stage) => stage.name === 'Spanner');
    const adlsStage = pipelineConfig.config.stages.find((stage) => stage.name === 'ADLS');

    let macroMap = {};
    if (databaseConfig) {
      try {
        databaseConfig = JSON.parse(databaseConfig);
      } catch (e) {
        databaseConfig = {};
      }
      macroMap = Object.assign(macroMap, databaseConfig);
    }
    macroMap = Object.assign({}, macroMap, {
      datasetName,
      filename: objectQuery(workspaceInfo, 'properties', 'path') || '',
      directives: directives.join('\n'),
      schema: objectQuery(wranglerStage, 'plugin', 'properties', 'schema') || '',
      schemaRowField: isNil(selectValueTable) ? headers[0] : selectValueTable,
      query: objectQuery(dbStage, 'plugin', 'properties', 'importQuery') || '',
      connectionString: objectQuery(dbStage, 'plugin', 'properties', 'connectionString') || '',
      password: objectQuery(dbStage, 'plugin', 'properties', 'password') || '',
      userName: objectQuery(dbStage, 'plugin', 'properties', 'user') || '',
      topic: objectQuery(kafkaStage, 'plugin', 'properties', 'topic') || '',
      kafkaBrokers: objectQuery(kafkaStage, 'plugin', 'properties', 'kafkaBrokers') || '',
      accessID: objectQuery(s3Stage, 'plugin', 'properties', 'accessID') || '',
      path:
        objectQuery(s3Stage, 'plugin', 'properties', 'path') ||
        objectQuery(gcsStage, 'plugin', 'properties', 'path') ||
        '',
      accessKey: objectQuery(s3Stage, 'plugin', 'properties', 'accessKey') || '',
      bucket: objectQuery(gcsStage, 'plugin', 'properties', 'bucket') || '',
      serviceFilePath: objectQuery(gcsStage, 'plugin', 'properties', 'serviceFilePath') || '',
      project: objectQuery(gcsStage, 'plugin', 'properties', 'project') || '',
      bqBucket: objectQuery(bigqueryStage, 'plugin', 'properties', 'bucket') || '',
      bqServiceFilePath:
        objectQuery(bigqueryStage, 'plugin', 'properties', 'serviceFilePath') || '',
      bqProject: objectQuery(bigqueryStage, 'plugin', 'properties', 'project') || '',
      bqDataset: objectQuery(bigqueryStage, 'plugin', 'properties', 'dataset') || '',
      bqTable: objectQuery(bigqueryStage, 'plugin', 'properties', 'table') || '',
      bqSchema: objectQuery(bigqueryStage, 'plugin', 'properties', 'schema') || '',
      spannerServiceFilePath:
        objectQuery(spannerStage, 'plugin', 'properties', 'serviceFilePath') || '',
      spannerProject: objectQuery(spannerStage, 'plugin', 'properties', 'project') || '',
      spannerInstance: objectQuery(spannerStage, 'plugin', 'properties', 'instance') || '',
      spannerDatabase: objectQuery(spannerStage, 'plugin', 'properties', 'database') || '',
      spannerTable: objectQuery(spannerStage, 'plugin', 'properties', 'table') || '',
      spannerSchema: objectQuery(spannerStage, 'plugin', 'properties', 'schema') || '',
      adlsProject: objectQuery(adlsStage, 'plugin', 'properties', 'project') || '',
    });
    const newMacorMap = {};
    // This is to prevent from passing all the empty properties as payload while starting the pipeline.
    Object.keys(macroMap)
      .filter((key) => !isEmpty(macroMap[key]))
      .forEach((key) => (newMacorMap[key] = macroMap[key]));
    return newMacorMap;
  };

  const addMacrosToPipelineConfig = (pipelineConfig) => {
    const { dataprep } = DataPrepStore.getState();
    const workspaceProps = objectQuery(dataprep, 'workspaceInfo', 'properties');

    const macroMap = getAppConfigMacros();
    const dataFormatProperties = {
      schema: '${schema}',
      name: '${datasetName}',
    };
    const pluginsMap = {
      Wrangler: {
        directives: '${directives}',
        schema: '${schema}',
        field: workspaceProps.connection === 'file' ? 'body' : '*',
        precondition: 'false',
        threshold: '1',
      },
      File: {
        path: '${filename}',
        referenceName: 'FileNode',
      },
      Table: {
        'schema.row.field': '${schemaRowField}',
        name: '${datasetName}',
        schema: '${schema}',
      },
      Database: {
        connectionString: '${connectionString}',
        user: '${userName}',
        password: '${password}',
        importQuery: '${query}',
      },
      Kafka: {
        referenceName: 'KafkaNode',
        kafkaBrokers: '${kafkaBrokers}',
        topic: '${topic}',
      },
      TPFSOrc: dataFormatProperties,
      TPFSParquet: dataFormatProperties,
      TPFSAvro: dataFormatProperties,
      S3: {
        accessID: '${accessID}',
        path: '${path}',
        accessKey: '${accessKey}',
        authenticationMethod: 'Access Credentials',
        recursive: 'false',
      },
      GCS: {
        bucket: '${bucket}',
        filenameOnly: 'false',
        path: '${path}',
        serviceFilePath: '${serviceFilePath}',
        project: '${project}',
        recursive: 'false',
        ignoreNonExistingFolders: 'false',
      },
      BigQueryTable: {
        project: '${bqProject}',
        serviceFilePath: '${bqServiceFilePath}',
        bucket: '${bqBucket}',
        dataset: '${bqDataset}',
        table: '${bqTable}',
        schema: '${bqSchema}',
      },
      Spanner: {
        project: '${spannerProject}',
        serviceFilePath: '${spannerServiceFilePath}',
        instance: '${spannerInstance}',
        database: '${spannerDatabase}',
        table: '${spannerTable}',
        schema: '${spannerSchema}',
      },
      ADLS: {
        project: '${adlsProject}',
      },
    };
    pipelineConfig.config.stages = pipelineConfig.config.stages.map((stage) => {
      if (!isNil(pluginsMap[stage.name])) {
        stage.plugin.properties = Object.assign(
          {},
          stage.plugin.properties,
          pluginsMap[stage.name]
        );
      }
      return stage;
    });

    return { pipelineConfig, macroMap };
  };

  const preparePipelineConfig = () => {
    let sink;
    const { workspaceInfo } = DataPrepStore.getState().dataprep;
    const { name: pipelineName } = workspaceInfo.properties;
    const pipelineconfig = cloneDeep(batchPipelineConfig);
    if (ingestDataToggle === 'fileset') {
      sink = fieldsetDataType.find((dataType) => dataType.name === selectValueFileset);
      if (sink) {
        sink = sinkPluginsForDataset[sink.name];
      }
    }
    if (ingestDataToggle === 'table') {
      sink = sinkPluginsForDataset.Table;
    }
    pipelineconfig.config.stages.push(sink);
    const { pipelineConfig: appConfig, macroMap } = addMacrosToPipelineConfig(pipelineconfig);
    const connections = batchPipelineConfig.config.connections;
    const sinkConnection = [
      {
        from: connections[0].to,
        to: sink.name,
      },
    ];
    appConfig.config.connections = connections.concat(sinkConnection);
    appConfig.config.schedule = '0 * * * *';
    appConfig.config.engine = 'mapreduce';
    appConfig.description = `Pipeline to create dataset for workspace ${pipelineName} from dataprep`;
    return { appConfig, macroMap };
  };

  const handleIngestDataClick = (e) => {
    const steps = cloneDeep(copyingSteps);
    const { dataprep } = DataPrepStore.getState();
    const workspaceProps = objectQuery(dataprep, 'workspaceInfo', 'properties');
    steps[0].status = 'running';
    setCopyInProgress(true);
    setCopyingSteps(steps);

    const { selectedNamespace: namespace } = NamespaceStore.getState();
    let pipelineName;
    const dbStage = batchPipelineConfig.config.stages.find(
      (dataType) => dataType.name === 'Database'
    );

    if (ingestDataToggle === 'fileset') {
      pipelineName = `one_time_copy_to_fs_${selectValueFileset}`;
      if (workspaceProps.connection === 'database') {
        pipelineName = `one_time_copy_to_fs_from_${dbStage.plugin.properties.jdbcPluginName}`;
      } else if (workspaceProps.connection === 'kafka') {
        pipelineName = 'one_time_copy_to_fs_from_kafka';
      } else if (workspaceProps.connection === 's3') {
        pipelineName = 'one_time_copy_to_fs_from_s3';
      } else if (workspaceProps.connection === 'gcs') {
        pipelineName = 'one_time_copy_to_fs_from_gcs';
      } else if (workspaceProps.connection === 'bigquery') {
        pipelineName = 'one_time_copy_to_fs_from_bigquery';
      } else if (workspaceProps.connection === 'spanner') {
        pipelineName = 'one_time_copy_to_fs_from_spanner';
      } else if (workspaceProps.connection === 'adls') {
        pipelineName = 'one_time_copy_to_fs_from_adls';
      }
    } else {
      pipelineName = `one_time_copy_to_table`;
      if (workspaceProps.connection === 'database') {
        pipelineName = `one_time_copy_to_table_from_${dbStage.plugin.properties.jdbcPluginName}`;
      } else if (workspaceProps.connection === 'kafka') {
        pipelineName = 'one_time_copy_to_table_from_kafka';
      } else if (workspaceProps.connection === 's3') {
        pipelineName = 'one_time_copy_to_table_from_s3';
      } else if (workspaceProps.connection === 'gcs') {
        pipelineName = 'one_time_copy_to_table_from_gcs';
      } else if (workspaceProps.connection === 'bigquery') {
        pipelineName = 'one_time_copy_to_table_from_bigquery';
      } else if (workspaceProps.connection === 'spanner') {
        pipelineName = 'one_time_copy_to_table_from_spanner';
      } else if (workspaceProps.connection === 'adls') {
        pipelineName = 'one_time_copy_to_table_from_adls';
      }
    }
    pipelineName = pipelineName.replace('TPFS', '');
    pipelineName = pipelineName.toLowerCase();

    let pipelineconfig, macroMap;
    // Get list of pipelines to check if the pipeline is already published

    MyAppApi.list({ namespace })
      .mergeMap((res) => {
        const appAlreadyDeployed = res.find((app) => app.id === pipelineName);
        alert(appAlreadyDeployed);
        if (!appAlreadyDeployed) {
          const appConfigWithMacros = preparePipelineConfig();

          pipelineconfig = appConfigWithMacros.appConfig;
          macroMap = appConfigWithMacros.macroMap;
          pipelineconfig.name = pipelineName;
          const params = {
            namespace,
            appId: pipelineName,
          };
          // If it doesn't exist create a new pipeline with macros.
          return MyAppApi.deployApp(params, pipelineconfig);
        }
        // If it already exists just move to next step.
        return Observable.create((observer) => {
          observer.next();
        });
      })
      .mergeMap(() => {
        const copyingStepsUpdated = [...copyingSteps];
        copyingStepsUpdated[0].status = 'success';
        copyingStepsUpdated[1].status = 'running';
        setCopyingSteps(copyingStepsUpdated);
        if (!macroMap) {
          macroMap = getAppConfigMacros();
        }
        // Once the pipeline is published start the workflow. Pass run time arguments for macros.
        return MyProgramApi.action(
          {
            namespace,
            appId: pipelineName,
            programType: 'workflows',
            programId: 'DataPipelineWorkflow',
            action: 'start',
          },
          macroMap
        );
      })
      .mergeMap(() => {
        setCopyTaskStarted(true);
        const count = 1;
        const getDataset = (callback, errorCallback, count) => {
          const params = {
            namespace,
            datasetId: datasetName,
          };
          MyDatasetApi.get(params).subscribe(callback, () => {
            if (count < 120) {
              count += count;
              setTimeout(() => {
                getDataset(callback, errorCallback, count);
              }, count * 1000);
            } else {
              errorCallback();
            }
          });
        };

        return Observable.create((observer) => {
          const successCallback = () => {
            observer.next();
          };
          const errorCallback = () => {
            observer.error(
              'Copy task timed out after 2 mins. Please check logs for more information.'
            );
          };
          getDataset(successCallback, errorCallback, count);
        });
      })
      .subscribe(
        () => {
          const copyingStepsUpdated = [...copyingSteps];
          const { selectedNamespace: namespaceId } = NamespaceStore.getState();
          copyingStepsUpdated[1].status = 'success';
          let datasetUrl = window.getAbsUIUrl({
            namespaceId,
            entityType: 'datasets',
            entityId: datasetName,
          });
          datasetUrl = `${datasetUrl}?modalToOpen=explore`;
          setCopyingSteps(copyingSteps);
          setDatasetUrl(datasetUrl);
        },
        (err) => {
          console.log('err', err);

          const copyingStepsUpdated = copyingSteps.map((step) => {
            if (step.status === 'running') {
              return Object.assign({}, step, { status: 'failure' });
            }
            return step;
          });
          setCopyingSteps(copyingStepsUpdated);

          if (!error) {
            const errorData = typeof err === 'object' ? err.response : err;
            setError(errorData);
          }
        }
      );
  };

  return (
    <DrawerWidget
      headingText={INGEST_DATA_HEADING}
      openDrawer={setOpenIngestDataDrawer}
      showDivider={false}
      closeClickHandler={closeIngestDataDrawerHandler}
    >
      <Box className={classes.bodyStyles}>
        <IngestBody
          ingestDataToggle={ingestDataToggle}
          handleToggleChange={handleToggleChange}
          datasetName={datasetName}
          handleDatasetName={handleDatasetName}
          selectValueFileset={selectValueFileset}
          handleSelectForFileset={handleSelectForFileset}
          selectValueTable={selectValueTable}
          handleSelectForTable={handleSelectForTable}
          headersNamesList={headersNamesList}
        />
      </Box>
      <Box className={classes.buttonGroup}>
        <Button
          variant="outlined"
          color="primary"
          className={classes.ingestDataButton}
          classes={{ root: classes.cancelButtonRoot }}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleCancel(e)}
        >
          {CANCEL_BUTTON}
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={isDisableIngestDataButton}
          classes={{
            root: classes.apply,
            containedPrimary: classes.ingestDataButtonColor,
          }}
          className={classes.ingestDataButton}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleIngestDataClick(e)}
        >
          {INGEST_DATA_BUTTON}
        </Button>
      </Box>
    </DrawerWidget>
  );
};
export default IngestData;
