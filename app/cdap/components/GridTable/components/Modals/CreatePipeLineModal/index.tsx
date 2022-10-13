import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Divider, Box, Typography } from '@material-ui/core';
import { BatchIcon, RealtimePipelineIcon, CrossIcon } from '../../../iconStore';
import { useStyles } from './styles';
import DataPrepStore from 'components/DataPrep/store';
import DataPrepActions from 'components/DataPrep/store/DataPrepActions';
import { getCurrentNamespace } from 'services/NamespaceStore';
import { Redirect } from 'react-router';
import getPipelineConfig from 'components/DataPrep/TopPanel/PipelineConfigHelper';

const PipeLineModal = ({ setOpenPipeline }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    setOpenPipeline(false);
  };

  const generateLinks = () => {
    const state = DataPrepStore.getState().dataprep;
    const workspaceId = state.workspaceId;
    const namespace = getCurrentNamespace();

    getPipelineConfig().subscribe(
      (res) => {
        let realtimeUrl;

        if (!res.realtimeConfig) {
          realtimeUrl = null;
        } else {
          realtimeUrl = window.getHydratorUrl({
            stateName: 'hydrator.create',
            stateParams: {
              namespace,
              workspaceId,
              artifactType: 'cdap-data-streams',
            },
          });
        }

        const batchUrl = window.getHydratorUrl({
          stateName: 'hydrator.create',
          stateParams: {
            namespace,
            workspaceId,
            artifactType: 'cdap-data-pipeline',
          },
        });
        window.open(`${batchUrl}`, '_self');
      },
      (err) => {}
    );
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{
        paper: classes.muiDialogPaper,
      }}
    >
      <DialogTitle id="alert-dialog-title" className={classes.muiDialogTitle}>
        <Box className={classes.headerFlex}>
          <Typography className={classes.modalHeader}>Create a pipeline</Typography>
          <span role="button" tabIndex={0} className={classes.closeIcon} onClick={handleClose}>
            {CrossIcon}
          </span>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Divider />
        <Typography className={classes.modalText}>Choose the type of pipeline to create</Typography>
        <Box className={classes.dialogActionGroup}>
          <Box className={classes.buttonStyles} onClick={() => generateLinks()}>
            {BatchIcon}
            <Typography className={classes.modalText}>Batch Pipeline</Typography>
          </Box>
          <Box className={classes.buttonStyles}>
            {RealtimePipelineIcon}
            <Typography className={classes.modalText}>Realtime Pipeline</Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PipeLineModal;
