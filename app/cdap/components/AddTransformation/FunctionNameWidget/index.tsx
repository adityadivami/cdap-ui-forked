import React from 'react';
import { FUNCTION } from '../constants';
import { useStyles } from '../styles';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const FunctionNameWidget = (props) => {
  const { functionName } = props;
  const classes = useStyles();

  return (
    <section className={classes.functionSectionStyles}>
      <div className={classes.funtionSectionWrapperStyles}>
        <div className={classes.functionHeadingTextStyles}>{FUNCTION}</div>
        <img
          className={classes.greenCheckIconStyles}
          src="/cdap_assets/img/green-check.svg"
          alt="tick icon"
        />
      </div>
      <div className={classes.functionInfoSectionStyles}>
        <span className={classes.functionTextStyles}>{functionName}</span>
        <span>
          <InfoOutlinedIcon className={classes.infoIcon} />
        </span>

        {/* Below commented code will re-direct the use to CDAP documnentation */}
        {/* <img className={classes.infoIconTextStyles} src="/cdap_assets/img/info.svg" alt="info" /> */}
      </div>
    </section>
  );
};

export default FunctionNameWidget;
