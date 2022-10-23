import { SetStateAction } from 'react';

export interface IInputCheckbox {
  label: string;
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
}
