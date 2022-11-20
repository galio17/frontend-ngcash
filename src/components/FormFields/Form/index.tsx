import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

import { IFields, IFormProps } from "../interfaces";

function Form<TFieldValues extends IFields>({
  children,
  schema,
  onSubmit,
  className,
}: IFormProps<TFieldValues>) {
  const methods = useForm<TFieldValues>(
    schema ? { resolver: yupResolver(schema) } : undefined
  );
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
}

export default Form;
