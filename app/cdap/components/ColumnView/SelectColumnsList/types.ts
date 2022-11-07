export interface IPrepareDataQualtiy {
  statistics: number;
  columnList: IHeaderNamesList[];
}

export interface IHeaderNamesList {
  name: string;
  label: string;
  // type: Array<string | number | IRecords | boolean>;
  type: Array<string | number | boolean>;
}

export interface ISelectColumnListProps {
  columnData: IHeaderNamesList[];
  dataQuality: unknown;
  searchTerm: string;
}

// need to add IRecords
interface IDataQuality {}
