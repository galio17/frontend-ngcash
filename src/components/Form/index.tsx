import { ReactNode } from "react";
import { FormProvider, Resolver, useForm } from "react-hook-form";

interface IFormProps {
  children: ReactNode;
  onSubmit: (...params: any[]) => void;
  schema?: Resolver<any, any>;
  className?: string;
}

function Form({ children, onSubmit, schema, className }: IFormProps) {
  const methods = useForm({
    resolver: schema,
  });
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
