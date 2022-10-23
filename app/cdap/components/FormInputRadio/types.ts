import { IParseOptions } from 'components/GridTable/types';

export interface IFormInputRadioProps {
  options: IParseOptions[];
  radioValue: string;
  setRadioValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
