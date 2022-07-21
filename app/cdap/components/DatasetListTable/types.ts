export interface IConnectorTypes {
  name: string;
  type: string;
  category: string;
  description: string;
  artifact: {
    name: string;
    version: string;
    scope: string;
  };
}

export interface Idatatable {
  canBrowse: boolean;
  canSample: boolean;
  connectionsName: string;
  name: string;
  path: string;
  type: string;
  properties: any;
}

export interface IdatatableProps {
  datasetList: Idatatable[];
}
