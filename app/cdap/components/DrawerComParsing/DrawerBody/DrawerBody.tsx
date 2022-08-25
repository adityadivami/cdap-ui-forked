import React, { useState } from 'react';
import { Divider, TextField } from '@material-ui/core';
import { useDrawerCss } from '../styles';
import {
  FormGroup,
  Checkbox,
  FormControlLabel,
  Box,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  InputLabel,
} from '@material-ui/core';

const DrawerBody = (props) => {
  const classes = useDrawerCss();
  const [format, setFormat] = React.useState('');

  const handleChange = (event) => {
    setFormat(event.target.value);
  };
  return (
    <React.Fragment>
      {props.bodyComponent ? (
        props.bodyComponent()
      ) : (
        <div>
          <Box width="350px" className={classes.paddingDiv}>
            <FormHelperText className={classes.weight400}> Format</FormHelperText>
            <TextField value={format} onChange={handleChange} select fullWidth>
              <MenuItem value="csv">csv </MenuItem>
            </TextField>
          </Box>

          <Box width="350px" className={classes.paddingDiv}>
            <FormHelperText className={classes.weight400}> Encoding</FormHelperText>
            <TextField value={format} onChange={handleChange} select fullWidth>
              <MenuItem value="csv">csv </MenuItem>
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
      )}
    </React.Fragment>
  );
};
export default DrawerBody;
