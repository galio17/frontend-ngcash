import { ChangeEventHandler } from "react";

import { useFormContext } from "react-hook-form";

import { IFields, IInputProps } from "../interfaces";

function Input({ label, name, onChange, ...inputProps }: IInputProps) {
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

  const registerProps = register(name);
  const handlerChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event);
    registerProps.onChange(event);
  };

  return (
    <div className="input-container group">
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
        {...registerProps}
        onChange={handlerChange}
        className="outline-none px-3 py-4 w-full h-full bg-[transparent]"
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
