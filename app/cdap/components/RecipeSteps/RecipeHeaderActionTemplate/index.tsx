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
import React from 'react';
import { useStyles } from '../styles';
import fileDownload from 'js-file-download';
import DataPrepStore from 'components/DataPrep/store';

export default function(props) {
  const classes = useStyles();
  const download = () => {
    const state = DataPrepStore.getState().dataprep;
    const workspaceId = state.workspaceId,
      directives = state.directives;

    const data = directives.join('\n'),
      filename = `${workspaceId}-directives.txt`;

    fileDownload(data, filename);
  };
  return (
    <div>
      <img
        className={classes.importIconStyles}
        src="/cdap_assets/img/import.svg"
        alt="Download icon"
        onClick={download}
      />
      <img
        src="/cdap_assets/img/more-options.svg"
        alt="More icon"
        className={classes.kebabMenuStyle}
      />
    </div>
  );
}
