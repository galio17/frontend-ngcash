import { useFormContext } from "react-hook-form";

interface IInputProps {
  name: string;
  label: string;
}

function Input({ label, name }: IInputProps) {
  const { register, watch } = useFormContext();

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
          ${focusLabel} absolute px-3 group-hover:text-secondary
          group-focus-within:text-primary
          group-focus-within:top-0 group-focus-within:translate-y-0
          group-focus-within:text-xs
        `}
      >
        {label}
      </label>
      <input
        type="text"
        id={name}
        {...register(name)}
        className="
          outline-none px-3 py-4 w-full h-full 
          bg-grey-0 dark:bg-grey-2
        "
      />
    </div>
  );
}

export default Input;
