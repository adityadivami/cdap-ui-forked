import { DIRECTIVES_MAP } from './ActionsWidget/Components/FilterAction/constants';

export const prepareDirectiveForFilter = (
  rowFilter,
  selectedCondition,
  newColumnName,
  ignoreCase,
  columnName
) => {
  let directive = '';
  let column = columnName;
  let textValue = newColumnName;
  let configuration;
  const condition = DIRECTIVES_MAP[rowFilter][selectedCondition];
  switch (selectedCondition) {
    case 'EMPTY':
      directive = `${condition} ${column} == null || ${column} =~ "^\\W*$"`;
      break;
    case 'TEXTCONTAINS':
      if (ignoreCase) {
        textValue = `(?i)${textValue}`;
      }
      directive = `${condition} ${column} .*${textValue}.*`;
      break;
    case 'TEXTSTARTSWITH':
      configuration = `"${textValue}"`;
      if (ignoreCase) {
        column = `${column}.toLowerCase()`;
        configuration = `"${textValue}".toLowerCase()`;
      }
      directive = `${condition} ${column} =^ ${configuration}`;
      break;
    case 'TEXTENDSWITH':
      configuration = `"${textValue}"`;
      if (ignoreCase) {
        column = `${column}.toLowerCase()`;
        configuration = `"${textValue}".toLowerCase()`;
      }
      directive = `${condition} ${column} =$ ${configuration}`;
      break;
    case 'TEXTEXACTLY':
      if (ignoreCase) {
        textValue = `(?i)${textValue}`;
      }
      directive = `${condition} ${column} ^${textValue}$`;
      break;
    case 'TEXTREGEX':
      directive = `${condition} ${column} ${textValue}`;
      break;
    // case 'CUSTOMCONDITION':
    //   directive = `${condition} ${column} ${this.state.customFilter}`;
    //   break;
  }
  return directive;
};

export const prepareDirectiveForDefineVariable = (
  variableValue,
  textFilter,
  selectedColumnValue,
  selectedAction
) => {
  const condition = 'set-variable';
  const column = selectedColumnValue;
  const textValue = textFilter;
  const variableName = variableValue;
  const selectedColumn = selectedColumnValue;
  let directive;
  const selectedCondition = selectedAction;
  if (!textValue || !variableName) {
    return;
  }

  switch (selectedCondition) {
    case 'TEXTCONTAINS':
      directive = `${condition} ${variableName} ${column} =~ .*${textValue}.* ? ${selectedColumn} : ${variableName}`;
      break;
    case 'TEXTSTARTSWITH':
      directive = `${condition} ${variableName} ${column} =^ "${textValue}" ? ${selectedColumn} : ${variableName}`;
      break;
    case 'TEXTENDSWITH':
      directive = `${condition} ${variableName} ${column} =$ "${textValue}" ? ${selectedColumn} : ${variableName}`;
      break;
    case 'TEXTEXACTLY':
      directive = `${condition} ${variableName} ${column} == "${textValue}" ? ${selectedColumn} : ${variableName}`;
      break;
    case 'TEXTREGEX':
      directive = `${condition} ${variableName} ${column} =~ ${textValue} ? ${selectedColumn} : ${variableName}`;
      break;
    case 'CUSTOMCONDITION':
      directive = `${condition} ${variableName} ${textValue} ? ${selectedColumn} : ${variableName}`;
      break;
  }
  return directive;
};
