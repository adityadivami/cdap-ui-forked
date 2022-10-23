export interface IFormInputComponentProps {
  formInputValue: string | number;
  classnames: string;
  inputProps: IFormInputProps;
}

export interface IFormInputProps {
  classes: Record<string, string>;
  type: string;
  value: string | number;
  onChange: (e: any) => void;
  color: 'primary' | 'secondary';
  placeholder: string;
}
