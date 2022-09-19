import React, { useState, useEffect } from 'react';
import { PLEASE_SELECT_THE_DELIMITER } from '../constants';
import { DELIMITER_OPTION_EXPLODE_EXTRACT } from '../options';
import InputRadioWithCustomInputComponent from '../ParseComponent/InputRadioWithCustomInputComponent';
import ParseComponent from '../ParseComponent';

const ParseCSVComponent = (props) => {
  const { setDirectiveComponentsValue, directiveComponentValues } = props;
  const [selectedParseType, setSelectedParseType] = useState('');
  const [delimiter, setDelimiter] = useState('');

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, radioOption: selectedParseType });
  }, [selectedParseType]);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, customInput: delimiter });
  }, [delimiter]);

  return (
    <ParseComponent sectionHeading={PLEASE_SELECT_THE_DELIMITER}>
      <InputRadioWithCustomInputComponent
        options={DELIMITER_OPTION_EXPLODE_EXTRACT}
        radioValue={selectedParseType}
        setRadioValue={setSelectedParseType}
        customInputType="customDelimiter"
        customInput={delimiter}
        setCustomInput={setDelimiter}
      />
    </ParseComponent>
  );
};

export default ParseCSVComponent;
