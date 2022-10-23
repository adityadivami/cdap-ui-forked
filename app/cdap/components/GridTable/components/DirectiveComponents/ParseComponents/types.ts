import { IDirectiveComponentValues } from 'components/AddTransformation/types';

export interface IParseCSVProps {
  directiveComponentValues: IDirectiveComponentValues;
  setDirectiveComponentsValue: React.Dispatch<React.SetStateAction<IDirectiveComponentValues>>;
}

export interface IInputRadioWithCustomInputProps {
  options: IParseOptions[];
  radioValue: string;
  setRadioValue: React.Dispatch<React.SetStateAction<string>>;
  customInputType: string;
  customInput: string;
  setCustomInput: React.Dispatch<React.SetStateAction<string>>;
}

export interface IParseOptions {
  value: string;
  label: string;
}

export interface IParseComponentProps {
  sectionHeading: string;
  children: JSX.Element;
}
