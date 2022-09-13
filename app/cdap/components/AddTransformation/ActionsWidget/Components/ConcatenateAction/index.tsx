import React, { useEffect } from 'react';
import {
  SELECT_ACTION_TO_TAKE,
  AT_BEGIN,
  AT_END,
  OF_CONTENT_OF_EACH_ROW,
  COPY_TO_NEW_COLUMN,
} from '../../../constants';
import { useStyles } from '../../../styles';
import {
  FormControl,
  FormControlLabel,
  TextField,
  Typography,
  Select,
  MenuItem,
  Checkbox,
} from '@material-ui/core';

const placeOption = [AT_BEGIN, AT_END];

const Concatenate = (props) => {
  const {
    selectedAction,
    setSelectedAction,
    setReplaceValue,
    replaceValue,
    setEncode,
    encode,
    setNewColumnName,
    newColumnName,
  } = props;
  const classes = useStyles();

  useEffect(() => {
    setSelectedAction(placeOption[0]);
  }, []);

  return (
    <section className={classes.functionSectionStyles}>
      <div className={classes.funtionSectionWrapperStyles}>
        <div className={classes.functionHeadingTextStyles}>{SELECT_ACTION_TO_TAKE}</div>
        <img
          className={classes.greenCheckIconStyles}
          src="/cdap_assets/img/green-check.svg"
          alt="tick icon"
        />
      </div>
      <FormControl className={classes.replaceWithInput}>
        <TextField
          variant="outlined"
          value={replaceValue}
          onChange={(e) => setReplaceValue(e.target.value)}
          placeholder="Enter String"
        />
      </FormControl>
      <FormControl className={classes.replaceWithInput}>
        <Select
          value={selectedAction}
          onChange={(e) => setSelectedAction(e.target.value)}
          variant="outlined"
        >
          {placeOption.map((item) => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
        </Select>
        <Typography variant="body1" className={classes.replaceWithText}>
          {OF_CONTENT_OF_EACH_ROW}
        </Typography>
        <FormControlLabel
          label={COPY_TO_NEW_COLUMN}
          control={
            <Checkbox
              color="primary"
              checked={encode}
              onChange={(e) => setEncode(e.target.checked)}
            />
          }
        />
      </FormControl>
      {encode && (
        <FormControl className={classes.replaceWithInput}>
          <TextField
            variant="outlined"
            value={newColumnName}
            onChange={(e) => setNewColumnName(e.target.value)}
            placeholder="Enter column name"
          />
        </FormControl>
      )}
    </section>
  );
};

export default Concatenate;
