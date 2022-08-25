import React from 'react';
import { Divider } from '@material-ui/core';
import { useDrawerCss } from '../styles';
import { TaskAltOutlined, InfoOutlined } from '../iconStore';
import {
  FormGroup,
  Checkbox,
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  InputLabel,
} from '@material-ui/core';

const DrawerBody = (props) => {
  const classes = useDrawerCss();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value as string);
  };
  return (
    <React.Fragment>
      {props.bodyComponent ? (
        props.bodyComponent()
      ) : (
        <div>
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
