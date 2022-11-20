import { useFormContext } from "react-hook-form";

import { IFields, IInputProps } from "../interfaces";

function Input({ label, name, ...inputProps }: IInputProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<IFields>();
  const errorMessage = errors[name]?.message;

  const isFilled = !!watch(name);
  const focusLabel = isFilled
    ? "top-0 translate-y-0 text-primary text-xs"
    : "top-1/2 -translate-y-1/2";

  return (
    <div
      className={`
        flex rounded-lg overflow-hidden border-2
        hover:border-secondary focus-within:ring focus-within:ring-primary group relative
        text-grey-2 dark:text-grey-0 border-grey-2 dark:border-grey-0
      `}
    >
      <label
        htmlFor={name}
        className={`
          ${focusLabel} absolute pl-3 group-hover:text-secondary
          group-focus-within:text-primary
          group-focus-within:top-0 group-focus-within:translate-y-0
          group-focus-within:text-xs
        `}
      >
        {label}
      </label>
      <input
        id={name}
        {...inputProps}
        {...register(name)}
        className="
          outline-none px-3 py-4 w-full h-full 
          bg-grey-0 dark:bg-grey-2
        "
      />
      {errorMessage && (
        <span className="text-xs text-alert absolute bottom-0 pl-3">
          {errorMessage as string}
        </span>
      )}
    </div>
  );
}

export default Input;
