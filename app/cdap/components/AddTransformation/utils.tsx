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
