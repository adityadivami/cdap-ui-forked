import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Divider, Box, Typography } from '@material-ui/core';
import { DownloadIcon, CrossIcon } from '../../../iconStore';
import { useStyles } from './styles';
import fileDownload from 'js-file-download';
import DataPrepStore from 'components/DataPrep/store';
import { getCurrentNamespace } from 'services/NamespaceStore';
import MyDataPrepApi from 'api/dataprep';
import cdapavsc from 'services/cdapavscwrapper';
import { isNullableType } from 'graphql';

const ViewSchemaModal = ({ setOpenViewSchema, headersNamesList }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [schema, setSchema] = useState({
    name: '',
    schema: null,
  });

  useEffect(() => {
    getSchema();
  }, []);

  const handleClose = () => {
    setOpen(false);
    setOpenViewSchema(false);
  };

  const getSchema = () => {
    const state = DataPrepStore.getState().dataprep;
    const workspaceId = state.workspaceId;

    const params = {
      context: getCurrentNamespace(),
      workspaceId,
    };

    MyDataPrepApi.getSpecification(params).subscribe(
      (res) => {
        const wranglerPlugin = res.wrangler;

        try {
          cdapavsc.parse(wranglerPlugin.schema);
        } catch (e) {}

        setSchema({
          name: 'etlSchemaBody',
          schema: wranglerPlugin.schema,
        });
      },
      (err) => {}
    );
  };

  const download = () => {
    const workspaceId = DataPrepStore.getState().dataprep.workspaceId;
    const filename = `${workspaceId}-schema.json`;
    fileDownload(JSON.stringify([schema], null, 4), filename);
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
          <Typography className={classes.modalHeader}>Schema</Typography>
          <Box>
            <span role="button" tabIndex={0} className={classes.closeIcon} onClick={download}>
              {DownloadIcon}
            </span>
            <span role="button" tabIndex={0} className={classes.closeIcon} onClick={handleClose}>
              {CrossIcon}
            </span>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Divider />
        <Box className={classes.schemaList}>
          {headersNamesList?.length &&
            headersNamesList.map((item) => {
              return (
                <Box className={classes.headersText}>
                  <Typography className={classes.modalText}>{item.name}</Typography>
                  <Typography className={classes.modalText}>{item.type}</Typography>
                </Box>
              );
            })}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ViewSchemaModal;
