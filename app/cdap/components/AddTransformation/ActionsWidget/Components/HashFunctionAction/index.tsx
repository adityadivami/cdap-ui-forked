import React, { useEffect } from 'react';
import { SELECT_ACTION_TO_TAKE } from '../../../constants';
import { useStyles } from '../../../styles';
import { FormControl, FormControlLabel, Select, MenuItem, Checkbox } from '@material-ui/core';

const hashAlgorithmOptions = [
  'BLAKE2B-160',
  'BLAKE2B-256',
  'BLAKE2B-384',
  'BLAKE2B-512',
  'GOST3411',
  'GOST3411-2012-256',
  'GOST3411-2012-512',
  'KECCAK-224',
  'KECCAK-256',
  'KECCAK-288',
  'KECCAK-384',
  'KECCAK-512',
  'MD2',
  'MD4',
  'MD5',
  'RIPEMD128',
  'RIPEMD160',
  'RIPEMD256',
  'RIPEMD320',
  'SHA',
  'SHA-1',
  'SHA-224',
  'SHA-256',
  'SHA-384',
  'SHA-512',
  'SHA-512/224',
  'SHA-512/256',
  'SHA3-224',
  'SHA3-256',
  'SHA3-384',
  'SHA3-512',
  'Skein-1024-1024',
  'Skein-1024-384',
  'Skein-1024-512',
  'Skein-256-128',
  'Skein-256-160',
  'Skein-256-224',
  'Skein-256-256',
  'Skein-512-128',
  'Skein-512-160',
  'Skein-512-224',
  'Skein-512-256',
  'Skein-512-384',
  'Skein-512-512',
  'SM3',
  'Tiger',
  'WHIRLPOOL',
];

const HashFunctionWidget = (props) => {
  const { filterAction, setFilterAction, setEncode, encode } = props;
  const classes = useStyles();

  useEffect(() => {
    setFilterAction(hashAlgorithmOptions[0]);
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
        <Select
          value={filterAction}
          onChange={(e) => setFilterAction(e.target.value)}
          variant="outlined"
        >
          {hashAlgorithmOptions.map((item) => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
        </Select>
        <FormControlLabel
          label="Encode"
          control={
            <Checkbox
              color="primary"
              checked={encode}
              onChange={(e) => setEncode(e.target.checked)}
            />
          }
        />
      </FormControl>
    </section>
  );
};

export default HashFunctionWidget;
