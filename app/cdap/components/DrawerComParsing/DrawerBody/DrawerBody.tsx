import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { useDrawerCss } from '../styles';
import {
  FormGroup,
  Checkbox,
  FormControlLabel,
  Box,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';

const DrawerBody = () => {
  const classes = useDrawerCss();
  const [format, setFormat] = React.useState('csv');
  const [encoding, setEncoding] = React.useState('utf8');
  const handleChange = (event) => {
    setFormat(event.target.value);
  };
  const onHandleChange = (event) => {
    setEncoding(event.target.value);
  };
  return (
    <React.Fragment>
      <div>
        <Box width="350px" className={classes.paddingDiv}>
          <FormHelperText className={classes.weight400}> Format</FormHelperText>
          <TextField
            value={format}
            onChange={handleChange}
            select
            className={classes.textFieldht}
            variant="outlined"
          >
            <MenuItem value="csv">CSV </MenuItem>
          </TextField>
        </Box>

        <Box width="350px" className={classes.paddingDiv}>
          <FormHelperText className={classes.weight400}> Encoding</FormHelperText>
          <TextField
            value={encoding}
            onChange={onHandleChange}
            className={classes.textFieldht}
            select
            variant="outlined"
          >
            <MenuItem value="utf8">UTF-8 </MenuItem>
          </TextField>
        </Box>

        <FormGroup className={classes.paddingDiv}>
          <FormControlLabel
            control={<Checkbox color="primary" size="medium" />}
            label="Enable Quoted Values"
          />
          <FormControlLabel
            control={<Checkbox color="primary" size="medium" />}
            label="Use first row as a header"
          />
        </FormGroup>
      </div>
    </React.Fragment>
  );
};
export default DrawerBody;
