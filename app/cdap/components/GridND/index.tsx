import React, { useContext, useState } from 'react';
import NamespaceStore, { getCurrentNamespace } from 'services/NamespaceStore';
import FileDropZone from './FileDropZone';
import Cookies from 'universal-cookie';
import UploadFile from 'services/upload-file';
import { ConnectionsContext } from 'components/Connections/ConnectionsContext';
import { Button } from '@material-ui/core';
import makeStyles from '@material-ui/core';
import { Redirect } from 'react-router';

const GridND = () => {
  const [file, setFile] = useState<File>();
  const [recordDelimiter, setRecordDelimiter] = useState('\\n');
  const [error, setError] = useState(null);
  const [workspaceId, setWorkspaceId] = useState(null);
  const { onWorkspaceCreate } = useContext(ConnectionsContext);
  const FILE_SIZE_LIMIT = 10 * 1024 * 1024;
  const cookie = new Cookies();

  function fileHandler(e) {
    const isJSONOrXML = e[0].type === 'application/json' || e[0].type === 'text/xml';

    setFile(e[0]);
    setRecordDelimiter(isJSONOrXML ? '' : '\\n');

    if (e[0].size > FILE_SIZE_LIMIT) {
      setError('File size must be less than 10MB');
    }
  }
  const recordDelimiteHandler = (e: any) => {};

  const upload = () => {
    console.log('Inside Upload');

    if (!file) {
      return;
    }

    const delimiter = recordDelimiter;
    const namespace = NamespaceStore.getState().selectedNamespace;
    const fileName = file.name;

    const url = `/namespaces/system/apps/dataprep/services/service/methods/contexts/${namespace}/workspaces`;

    const headers = {
      'Content-Type': 'application/data-prep',
      'X-Archive-Name': fileName,
      file: fileName,
    };

    UploadFile({ url, fileContents: file, headers }).subscribe(
      (res) => {
        try {
          const workspace = JSON.parse(res);
          setWorkspaceId(workspace);
        } catch (e) {
          console.log('error', e);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  if (workspaceId) {
    return <Redirect to={`/ns/${getCurrentNamespace()}/wrangler/${workspaceId}`} />;
  }
  return (
    <div className="uploadContentContainer">
      <div className="fileUpload">
        <FileDropZone onDropHandler={fileHandler} file={file} />
      </div>
      <div>
        <Button onClick={upload}>Submit</Button>
      </div>
    </div>
  );
};
export default GridND;
function isNil(token: any) {
  throw new Error('Function not implemented.');
}
