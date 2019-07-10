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

import * as React from 'react';
import { humanReadableDate } from 'services/helpers';
import { IApplicationRecord } from 'components/PipelineList/DeployedPipelineView/types';
import { objectQuery } from 'services/helpers';
import { GLOBALS } from 'services/global-constants';

interface ILastStartViewProps {
  pipeline: IApplicationRecord;
}

const LastStartView: React.SFC<ILastStartViewProps> = ({ pipeline }) => {
  const run = getRun(pipeline);
  const lastStarting = objectQuery(run, 'starting');

  return <div className="last-start">{humanReadableDate(lastStarting)}</div>;
};

function getRun(pipeline) {
  const applicationDetail = objectQuery(pipeline, 'applicationDetail');

  if (applicationDetail === null || applicationDetail === undefined) {
    return [];
  }

  const programs = objectQuery(applicationDetail, 'programs');

  if (programs === null || programs === undefined) {
    return [];
  }

  const artifact = objectQuery(pipeline, 'artifact');

  if (artifact === null || artifact === undefined) {
    return [];
  }

  const programName = GLOBALS.programInfo[artifact.name].programName;
  const runProgram = programs.find((program) => program.name === programName);

  return runProgram.runs[0];
}

const LastStart = LastStartView;

export default LastStart;
