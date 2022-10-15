import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Divider, Box, Typography } from '@material-ui/core';
import { BatchIcon, RealtimePipelineIcon, CrossIcon } from '../../../iconStore';
import { useStyles } from './styles';

const PipeLineModal = ({ setOpenPipeline }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    setOpenPipeline(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.dialogWrapper}
      maxWidth={'md'}
      fullWidth={true}
    >
      <DialogTitle id="alert-dialog-title">
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
          <Box className={classes.buttonStyles}>
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
