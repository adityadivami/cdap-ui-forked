import React from 'react';
import { useStyles } from '../styles';
import DataPrepStore from 'components/DataPrep/store';
import fileDownload from 'js-file-download';

const RecipeHeaderActionTemplate = (props) => {
  const classes = useStyles();

  const handleDownload = () => {
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
        onClick={handleDownload}
      />
      <img src="/cdap_assets/img/more-options.svg" alt="More icon" className={classes.more_icon} />
    </div>
  );
};

export default RecipeHeaderActionTemplate;
