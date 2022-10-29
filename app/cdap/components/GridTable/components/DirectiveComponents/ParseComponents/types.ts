import { IDirectiveComponentValues } from 'components/AddTransformation/types';

export interface IParseCSVProps {
  directiveComponentValues: IDirectiveComponentValues;
  setDirectiveComponentsValue: React.Dispatch<React.SetStateAction<IDirectiveComponentValues>>;
}

export interface IParseComponentProps {
  sectionHeading: string;
  children: JSX.Element;
}
