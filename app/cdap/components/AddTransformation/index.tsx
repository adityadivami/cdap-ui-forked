import { Button, Container } from '@material-ui/core';
import DrawerWidget from 'components/DrawerWidget';
import React, { Fragment, useState } from 'react';
import ActionsWidget from './ActionsWidget';
import {
  ADD_TRANSFORMATION_STEP,
  APPLY_STEP,
  SELECT_COLUMNS_TO_APPLY_THIS_FUNCTION,
  DONE_STEP,
} from './constants';
import FunctionNameWidget from './FunctionNameWidget';
import SelectColumnsList from './SelectColumnsList';
import SelectColumnsWidget from './SelectColumnsWidget';
import SelectedColumnCountWidget from './SelectedColumnCountWidget';
import DataPrepStore from 'components/DataPrep/store';
import { useStyles } from './styles';
import MyDataPrepApi from 'api/dataprep';
import { useParams } from 'react-router';

const AddTransformation = (props) => {
  const { functionName, columnData, setLoading, missingDataList } = props;
  const params = useParams() as any;

  const [drawerStatus, setDrawerStatus] = useState(true);
  const [columnsPopup, setColumnsPopup] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [selectedAction, setSelectedAction] = useState('');
  const [encode, setEncode] = useState(false);
  const [replaceValue, setReplaceValue] = useState('');
  const [oldValue, setOldValue] = useState('');
  const [exactMatch, setExactMatch] = useState(false);
  const [ignoreCase, setIgnoreCase] = useState(false);
  const { dataprep } = DataPrepStore.getState();

  const classes = useStyles();

  const closeClickHandler = () => {
    props.callBack();
  };

  const handleApply = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    if (functionName == 'null') {
      const paramsData = {
        context: params.namespace,
        workspaceId: params.wid,
      };
      const directivesArray =
        selectedAction == 'remove'
          ? selectedColumns.map(
              ({ label }) =>
                `filter-rows-on condition-true ${label} == null || ${label} =~ \"^\\W*$\"`
            )
          : selectedColumns.map(({ label }) => `fill-null-or-empty :${label} '${replaceValue}'`);
      const apiPayload = {
        directives: dataprep.directives.length
          ? dataprep.directives.concat(directivesArray)
          : directivesArray,
        limit: 1000,
        insights: dataprep.insights,
      };

      MyDataPrepApi.execute(paramsData, apiPayload)
        .subscribe((response) => {
          props.callBack(response);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      if (functionName === 'hash') {
        props.applyTransformation(selectedColumns[0].label, replaceValue, encode);
      } else if (functionName === 'findAndReplace') {
        const newOldValue = exactMatch ? `^${oldValue}$` : oldValue;
        const newValue = ignoreCase
          ? `s/${newOldValue}/${replaceValue}/Ig`
          : `s/${newOldValue}/${replaceValue}/g`;
        props.applyTransformation(selectedColumns[0].label, newValue);
      } else {
        props.applyTransformation(selectedColumns[0].label, replaceValue);
      }
    }
  };

  const handleSelectColumn = () => {
    setColumnsPopup(true);
  };

  const closeSelectColumnsPopup = () => {
    setColumnsPopup(false);
  };

  return (
    <Fragment>
      <DrawerWidget
        headingText={ADD_TRANSFORMATION_STEP}
        openDrawer={functionName}
        closeClickHandler={closeClickHandler}
      >
        <Container className={classes.addTransformationBodyStyles}>
          <div className={classes.addTransformationBodyWrapperStyles}>
            <SelectedColumnCountWidget selectedColumnsCount={selectedColumns.length} />
            <FunctionNameWidget functionName={functionName} />
            <SelectColumnsWidget
              setSelectedColumns={setSelectedColumns}
              handleSelectColumn={handleSelectColumn}
              selectedColumns={selectedColumns}
            />
            <ActionsWidget
              functionName={functionName}
              setSelectedAction={setSelectedAction}
              selectedAction={selectedAction}
              setReplaceValue={setReplaceValue}
              replaceValue={replaceValue}
              selectedColumns={selectedColumns}
              columnData={columnData.map(({ label }) => label)}
              setEncode={setEncode}
              encode={encode}
              oldValue={oldValue}
              setOldValue={setOldValue}
              exactMatch={exactMatch}
              setExactMatch={setExactMatch}
              ignoreCase={ignoreCase}
              setIgnoreCase={setIgnoreCase}
            />
          </div>
          <Button
            variant="contained"
            disabled={selectedColumns.length ? false : true}
            color="primary"
            classes={{ containedPrimary: classes.buttonStyles }}
            className={classes.applyStepButtonStyles}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleApply(e)}
          >
            {APPLY_STEP}
          </Button>
        </Container>
      </DrawerWidget>
      <DrawerWidget
        headingText={SELECT_COLUMNS_TO_APPLY_THIS_FUNCTION}
        openDrawer={columnsPopup}
        showBackIcon={true}
        closeClickHandler={closeSelectColumnsPopup}
      >
        <Container className={classes.addTransformationBodyStyles}>
          <div className={classes.addTransformationBodyWrapperStyles}>
            <SelectColumnsList
              columnData={columnData}
              selectedColumnsCount={selectedColumns.length}
              setSelectedColumns={setSelectedColumns}
              dataQuality={missingDataList}
            />
          </div>
          <Button
            variant="contained"
            disabled={selectedColumns.length ? false : true}
            color="primary"
            classes={{ containedPrimary: classes.buttonStyles }}
            className={classes.applyStepButtonStyles}
            onClick={closeSelectColumnsPopup}
          >
            {DONE_STEP}
          </Button>
        </Container>
      </DrawerWidget>
    </Fragment>
  );
};

export default AddTransformation;
