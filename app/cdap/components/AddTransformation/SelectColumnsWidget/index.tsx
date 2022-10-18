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
import { Button, Typography } from '@material-ui/core';
import T from 'i18n-react';
import { useStyles } from '../styles';
import { multipleColumnSelected } from '../constants';

export default function(props) {
  const { selectedColumns, functionName } = props;
  const classes = useStyles();

  const singleColumnSelect = () => {
    return (
      <>
        <div className={classes.functionHeadingTextStyles}>
          {T.translate('features.WranglerNewAddTransformation.selectColumn')}
        </div>
        <div className={classes.quickSelectTextStyles}>
          {T.translate('features.WranglerNewAddTransformation.quickSelect')}
        </div>
        {selectedColumns.length ? (
          selectedColumns.map((item, index) => {
            return (
              <Typography variant="body1" className={classes.quickSelectTextStyles}>
                {index + 1}.&nbsp; {item.label}
              </Typography>
            );
          })
        ) : (
          <Button
            variant="outlined"
            color="primary"
            className={classes.selectButtonStyles}
            onClick={() => props.handleSelectColumn(false)}
          >
            {multipleColumnSelected.filter((el) => el.value === functionName).length > 0
              ? T.translate('features.WranglerNewAddTransformation.selectMultiColumns')
              : T.translate('features.WranglerNewAddTransformation.selectCoulmn')}
          </Button>
        )}
      </>
    );
  };

  return <section className={classes.functionSectionStyles}>{singleColumnSelect()}</section>;
}
