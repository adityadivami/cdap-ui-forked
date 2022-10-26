/*
 * Copyright © 2022 Cask Data, Inc.
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

import { Box } from '@material-ui/core/';
import MyDataPrepApi from 'api/dataprep';
import T from 'i18n-react';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { defaultIfEmpty, switchMap } from 'rxjs/operators';
import { getCurrentNamespace } from 'services/NamespaceStore';
import OngoingDataExplorationsCard from '../OngoingDataExplorationsCard';
import { IResponseData } from './types';
import { generateDataForExplorationCard } from './utils';
import { orderBy } from 'lodash';

export default function OngoingDataExplorations() {
  const [ongoingExpDatas, setOngoingExpDatas] = useState([]);
  const [finalArray, setFinalArray] = useState([]);

  const getOngoingData = useCallback(() => {
    const expData = [];
    // Getting the workspace name, path ,workspaceId and name from MyDataPrepApi.getWorkspaceList API and
    //  using these in params and requestBody to get Data quality from MyDataPrepApi.execute API
    MyDataPrepApi.getWorkspaceList({
      context: 'default',
    })
      .pipe(
        switchMap((res: Record<string, unknown[]>) => {
          let values = [];
          values = res.values;
          values = orderBy(
            values,
            [(workspace) => (workspace.workspaceName || '').toLowerCase()],
            ['asc']
          );
          const workspaces = values.map((item) => {
            const params = {
              context: 'default',
              workspaceId: item.workspaceId,
            };
            const requestBody = {
              directives: item.directives,
              limit: 1000,
              insights: {
                name: item?.sampleSpec?.connectionName,
                workspaceName: item.workspaceName,
                path: item?.sampleSpec?.path,
                visualization: {},
              },
            };

            expData.push({
              connectionName:
                item?.sampleSpec?.connectionName === undefined
                  ? 'Upload'
                  : item?.sampleSpec?.connectionName,
              workspaceName: item.workspaceName,
              recipeSteps: item.directives.length,
              dataQuality: null,
              workspaceId: item.workspaceId,
              count: 0,
            });
            return MyDataPrepApi.execute(params, requestBody);
          });
          return forkJoin(workspaces).pipe(defaultIfEmpty(null));
        })
      )
      .subscribe((responses) => {
        if (responses && Array.isArray(responses) && responses.length) {
          responses.forEach((workspace, index) => {
            let dataQuality = 0;
            workspace.headers.forEach((element) => {
              const general = workspace.summary.statistics[element].general;
              const { empty: empty = 0, 'non-null': nonEmpty = 100 } = general;
              const nonNull = Math.floor((nonEmpty - empty) * 10) / 10;

              dataQuality = dataQuality + nonNull;
            });
            const totalDataQuality = dataQuality / workspace.headers.length;
            expData[index].dataQuality = totalDataQuality;
            expData[index].count = workspace.count;
            const final = generateDataForExplorationCard(expData);

            /**
             * if we have setData, then we should send data to parent element as the exploration state is then maintained in parent as well for showing or hiding the title of the parent component
             */
            setFinalArray(final);
          });
        }
      });
  }, []);

  useEffect(() => {
    getOngoingData();
  }, []);

  useEffect(() => {
    getOngoingData();
  }, []);

  useEffect(() => {
    console.log(ongoingExpDatas, 'ongoingExpDatas');
    const final = generateDataForExplorationCard(ongoingExpDatas);
    setFinalArray(final);
  }, [ongoingExpDatas]);

  return (
    <Box data-testid="ongoing-data-explore-parent">
      {finalArray.map((item, index) => {
        return (
          <Link
            to={{
              pathname: `/ns/${getCurrentNamespace()}/wrangler-grid/${`${item[4].workspaceId}`}`,
              state: {
                from: T.translate('features.Breadcrumb.labels.wrangleHome'),
                path: T.translate('features.Breadcrumb.params.wrangleHome'),
              },
            }}
            style={{ textDecoration: 'none' }}
          >
            {index <= 1 && <OngoingDataExplorationsCard item={item} key={index} />}
          </Link>
        );
      })}
    </Box>
  );
}
