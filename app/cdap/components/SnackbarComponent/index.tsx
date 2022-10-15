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
import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { useStyles } from './styles';
import TransitionComponent from './Components/TransitionComponent';

const PositionedSnackbar = ({
  handleCloseError,
  handleDefaultCloseSnackbar,
  messageToDisplay,
  isSuccess,
  actionType,
}: {
  handleCloseError: () => void;
  handleDefaultCloseSnackbar?: () => void;
  messageToDisplay?: string;
  isSuccess?: boolean;
  actionType?: string;
}) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    handleClick();
    const timer = setTimeout(() => {
      setIsOpen(false);
      handleDefaultCloseSnackbar();
    }, 5000);
    return () => {
      setIsOpen(true);
      clearTimeout(timer);
    };
  }, []);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    handleCloseError();
  };

  const properties = {
    close: () => handleClose(),
    messageToDisplay,
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={isOpen}
      classes={{ anchorOriginTopLeft: classes.MUIanchor, root: classes.MUIRoot }}
      TransitionComponent={() => (
        <TransitionComponent
          close={() => handleClose()}
          isSuccess={isSuccess}
          messageToDisplay={messageToDisplay}
          actionType={actionType}
        />
      )}
      className={isSuccess ? classes.success : classes.error}
    />
  );
};

export default PositionedSnackbar;
