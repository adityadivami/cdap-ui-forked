import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { ArrowRight } from '@material-ui/icons';
import { Button, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core';
import { mockdata } from './mock';
import './style.scss';
import { fetchConnectors } from 'components/Connections/Create/reducer';
import { getCategorizedConnections } from 'components/Connections/Browser/SidePanel/apiHelpers';

const VerticalExpandingListView = () => {
  const CustomTab = styled(Button)({
    backgroundColor: 'skyblue',
    width: '100%',
    color: '#000',
    borderRadius: '0px',
    border: '1px solid black',
  });

  const [expandingList, setExpandingList] = useState([]); // [[first section ],[second section],[]]

  const getConnectorType = async () => {
    const connectorTypes = await fetchConnectors(); // Array of Objects we get connector Types

    const connections = await getCategorizedConnections();
    const connectorTypeArray = [];
    connectorTypes.forEach((connectorType) => {
      let connectypeLength = connections.get(connectorType.name)?.length;
      connectypeLength = isNaN(connectypeLength) ? 0 : 1;
      const obj = {
        name: connectorType.name,
        numberOfConnections: connectypeLength,
      };
      connectorTypeArray.push(obj);
    });
    setExpandingList([connectorTypeArray]); // [[{name: , length : },{},{},],[],[]........]
  };

  useEffect(() => {
    getConnectorType();
  }, []);
  useEffect(() => {
    console.log('expandingList', expandingList);
  }, [expandingList]);

  const getNewData = (exactindex, listElement) => {
    // api call
    console.log(listElement);
    const matchedindex = mockdata.findIndex((each, index) => index === exactindex);
    if (matchedindex !== -1) {
      return mockdata[matchedindex];
    }
    return false;
  };

  const updateArr = async (event, listElement, listElementIndex, externalindex) => {
    event.preventDefault();

    const newarr = JSON.parse(JSON.stringify(expandingList));
    if (externalindex < expandingList.length - 1) {
      newarr.splice(externalindex + 1);
    }

    const newdata = getNewData(externalindex, listElement);
    if (newdata) {
      newarr.push(newdata);
    }

    setExpandingList(newarr);
  };

  return (
    <div className="vertical_container">
      {expandingList &&
        Array.isArray(expandingList) &&
        expandingList.length &&
        expandingList.map((eachList, eachListIndex) => (
          <div className="vertical_container_internal" key={eachListIndex}>
            {eachList.map((listElement, listElementIndex) => (
              <CustomTab
                endIcon={<ArrowRight />}
                onClick={(e) => updateArr(e, listElement, listElementIndex, eachListIndex)}
                key={listElementIndex}
              >
                {eachListIndex !== 0 ? ( // if 1st section display name with length
                  <>{listElement.name}</>
                ) : (
                  <>
                    {' '}
                    {listElement.name}
                    <Typography>({listElement.numberOfConnections})</Typography>{' '}
                  </>
                )}{' '}
              </CustomTab>
            ))}
          </div>
        ))}
    </div>
  );
};

export default VerticalExpandingListView;
