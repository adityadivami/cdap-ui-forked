export interface IFormInputComponentProps {
  formInputValue: string | Number;
  classnames: string;
  inputProps: IFormInputProps;
}

export interface IFormInputProps {
  classes: {
    underline: string;
    input: string;
  };
  type: string;
  value: string | Number;
  onChange: (e: any) => void;
  color: 'primary' | 'secondary';
  placeholder: string;
}
