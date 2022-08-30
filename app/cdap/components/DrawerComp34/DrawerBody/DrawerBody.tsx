import React from 'react';
import { Divider, TextField } from '@material-ui/core';
import { useDrawerCss } from '../styles';
import { TaskAltOutlined, InfoOutlined } from '../iconStore';
import { FormControl, RadioGroup, Radio, FormControlLabel, Button } from '@material-ui/core';

const DrawerBody = () => {
  const classes = useDrawerCss();
  const [value, setValue] = React.useState('rowReplace');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <React.Fragment>
      <div>
        <div>
          <div className={classes.paddingDiv}>
            <p className={classes.weight400}>No columns selected</p>
          </div>
          <Divider />
          <div className={classes.paddingDiv}>
            <div className={classes.flexBetween}>
              <p className={classes.weight600}>Function</p>
              {TaskAltOutlined()}
            </div>
            <p>Null &nbsp;{InfoOutlined()}</p>
          </div>
          <Divider />
          <div className={classes.paddingDiv}>
            <div>
              <p className={classes.weight600}>Select column(s) to apply this function</p>
              <p className={classes.weight400}>
                Quick select by clicking a column on the grid/columns panel
              </p>
              <Button variant="outlined" className={classes.buttonOutlined}>
                Select columns
              </Button>
            </div>
          </div>
          <Divider />
          <div className={classes.paddingDiv}>
            <div className={classes.flexBetween}>
              <p className={classes.weight600}>Select action to take</p>
              {TaskAltOutlined()}
            </div>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
                className="rowRadio"
              >
                <FormControlLabel value="rowRemoval" control={<Radio />} label="Remove rows" />
                <FormControlLabel
                  value="rowReplace"
                  control={<Radio color="primary" />}
                  label="Replace rows"
                />
              </RadioGroup>
            </FormControl>
            <p className={classes.weight400}>Replace with</p>
            <input className={classes.replaceInput} />
            <Divider />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default DrawerBody;
