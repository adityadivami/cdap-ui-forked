import React from 'react';
import { Divider } from '@material-ui/core';
import { useDrawerCss } from '../styles';
import { TaskAltOutlined, InfoOutlined } from '../iconStore';
import { FormControl, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';

const DrawerBody = () => {
  const classes = useDrawerCss();
  const [value, setValue] = React.useState('rowRemoval');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <React.Fragment>
      <div>
        <div className={classes.paddingDiv}>
          <p className={classes.weight400}>01 column selected</p>
        </div>
        <Divider />
        <div className={classes.paddingDiv}>
          <div className={classes.flexBetween}>
            <p className={classes.weight600}>Function</p>
            {TaskAltOutlined()}
          </div>
          <p>Null &nbsp; {InfoOutlined()}</p>
        </div>
        <Divider />
        <div className={classes.paddingDiv}>
          <div>
            <div className={classes.flexBetween}>
              <p className={classes.weight600}>Select column(s) to apply this function</p>
              {TaskAltOutlined()}
            </div>

            <p className={classes.weight400}>
              Quick select by clicking a column on the grid/columns panel
            </p>
            <p className={classes.weight40}> 1. Car Model (40 Null Values)</p>
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
              className={classes.weight400}
            >
              <FormControlLabel
                value="rowRemoval"
                control={<Radio color="primary" />}
                label="Remove rows"
              />
              <FormControlLabel
                value="rowReplace"
                control={<Radio color="primary" />}
                label="Replace rows"
              />
            </RadioGroup>
          </FormControl>
          <Divider />
        </div>
      </div>
    </React.Fragment>
  );
};
export default DrawerBody;
