import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, makeStyles } from '@material-ui/core';
import { ImportIcon } from './ImportIcon';

const useStyles = makeStyles({
  importData: {
    border: '1px solid #E0E0E0',
    height: '48px',
    width: '165px',
    margin: '58px 0px 0px 50px',
    padding: '14px 0px 15px 21px',
    cursor: 'pointer',
    display: 'flex',
    gap: '14px',
  },
});

const FileDropZone = ({ onDropHandler, file }) => {
  const classes = useStyles();
  const onDrop = useCallback((acceptedFiles) => {
    onDropHandler(acceptedFiles);
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <Box className={classes.importData}>
          <ImportIcon />
          <p>Import data</p>
        </Box>
      )}
    </div>
  );
};
export default FileDropZone;
