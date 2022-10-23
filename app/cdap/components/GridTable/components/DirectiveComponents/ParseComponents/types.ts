import { IDirectiveComponentValues } from 'components/AddTransformation/types';

export interface IParseCSVProps {
  directiveComponentValues: IDirectiveComponentValues;
  setDirectiveComponentsValue: React.Dispatch<React.SetStateAction<IDirectiveComponentValues>>;
}
