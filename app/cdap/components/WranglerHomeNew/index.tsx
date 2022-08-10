import React, { useEffect, useState } from 'react';
import OngoingDataExploration from 'components/OngoingDataExploration';
import WrangleCard from 'components/WrangleCard';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import { GradientLine } from './icons/GradientLine';
import { HeaderImage } from './icons/HeaderImage';
import WrangleHomeTitle from 'components/WrangleHomeTitle';
import { useStyles } from './styles';
import MyDataPrepApi from 'api/dataprep';

const WranglerHomeNew = () => {
  const classes = useStyles();
  const [ongoingExpData, setOngoingExpData] = useState<any>([]);

  const getOngoingData = () => {
    MyDataPrepApi.getWorkspaceList({
      context: 'default',
    }).subscribe((res) => {
      console.log(res);
      res.values.forEach((item) => {
        const params = {
          context: 'default',
          workspaceId: item.workspaceId,
        };
        const requestBody = {
          directives: item.directives,
          limit: 1000,
          insights: {
            name: item.name,
            workspaceName: item.workspaceName,
            path: item?.sampleSpec?.path,
            visualization: {},
          },
        };
        MyDataPrepApi.execute(params, requestBody).subscribe((response) => {
          console.log(`Response for ${params.workspaceId}`, response);
          let dataQuality = 0;
          response.headers.forEach((head) => {
            const general = response.summary.statistics[head].general;
            const { empty: empty = 0, 'non-null': nonEmpty = 100 } = general;
            const nonNull = Math.floor((nonEmpty - empty) * 10) / 10;
            dataQuality = dataQuality + nonNull;
          });

          const totalDataQuality = dataQuality / response.headers.length;

          setOngoingExpData((current) => [
            ...current,
            {
              connectionName:
                item?.sampleSpec?.connectionName === undefined
                  ? 'Upload'
                  : item?.sampleSpec?.connectionName,
              workspaceName: item.workspaceName,
              recipeSteps: item.directives.length,
              dataQuality: totalDataQuality,
            },
          ]);
        });
      });
    });
  };

  useEffect(() => {
    getOngoingData();
  }, []);
  useEffect(() => {
    console.log('ongoingExpData', ongoingExpData);
  }, [ongoingExpData]);
  return (
    <Box className={classes.wrangleHomeWrapper}>
      <Box className={classes.subHeader}>
        <Typography className={classes.welcome}>
          Hi David, <br />
          Welcome to Wrangler
        </Typography>
        <Box> {HeaderImage}</Box>
      </Box>
      {GradientLine}

      <Box>
        <WrangleHomeTitle title="Start data exploration" />
        <WrangleCard />
        <WrangleHomeTitle title="Continue ongoing data explorations, pick up where you left off" />
        <OngoingDataExploration />
      </Box>
    </Box>
  );
};
export default WranglerHomeNew;
