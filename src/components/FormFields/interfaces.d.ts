import { InputHTMLAttributes } from "react";

export interface IFields {
  [key: string]: any;
}

export interface IFormProps<TFieldValues extends IFields> {
  children: ReactNode;
  schema?: SchemaOf<TFieldValues>;
  onSubmit: (data: TFieldValues) => void;
  className?: string;
}

export interface IInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  name: string;
  label: string;
}
