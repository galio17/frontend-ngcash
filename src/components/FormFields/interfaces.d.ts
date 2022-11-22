import { InputHTMLAttributes } from "react";

interface IFields {
  [key: string]: any;
}

interface IFormProps<TFieldValues extends IFields> {
  children: ReactNode;
  schema?: SchemaOf<TFieldValues>;
  onSubmit: (data: TFieldValues) => void;
  className?: string;
}

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}
