import React from 'react';
import { useStyles } from '../styles';
import fileDownload from 'js-file-download';
import DataPrepStore from 'components/DataPrep/store';

const RecipeHeaderActionTemplate = (props) => {
  const classes = useStyles();
  const download = () => {
    const state = DataPrepStore.getState().dataprep;
    const workspaceId = state.workspaceId,
      directives = state.directives;

    const data = directives.join('\n'),
      filename = `${workspaceId}-directives.txt`;

    fileDownload(data, filename);
  };
  return (
    <div>
      <img
        className={classes.importIconStyles}
        src="/cdap_assets/img/import.svg"
        alt="Download icon"
        onClick={download}
      />
      <img src="/cdap_assets/img/more-options.svg" alt="More icon"  className={classes.kebabMenuStyle}/>
    </div>
  );
};

export default RecipeHeaderActionTemplate;
