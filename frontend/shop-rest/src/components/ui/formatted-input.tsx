import { forwardRef } from "react";
import cn from "classnames";
import Cleave from "cleave.js/react";
interface FormattedInputProps {
  name: string;
  label: string;
  options: any;
  error?: string;
  variant?: "normal" | "solid" | "outline";
  className?: string;
  inputClassName?: string;
  shadow?: boolean;
  [key: string]: unknown;
}

const variantClasses = {
  normal:
    "bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent",
  solid:
    "bg-gray-100 border border-border-100 focus:bg-light focus:border-accent",
  outline: "border border-border-base focus:border-accent",
};

const FormattedInput = forwardRef<HTMLInputElement, FormattedInputProps>(
  (
    {
      name,
      label,
      error,
      options,
      variant = "normal",
      className,
      inputClassName,
      shadow = false,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={className}>
        <label htmlFor={name} className="block mb-2 text-sm text-body">
          {label}
        </label>
        <Cleave
          id={name}
          name={name}
          className={cn(
            "py-3 px-4 w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0",
            shadow && "focus:shadow",
            variantClasses[variant],
            inputClassName
          )}
          options={options}
          //@ts-ignore
          htmlRef={ref}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          aria-invalid={error ? "true" : "false"}
          {...rest}
        />
        {error && <p className="my-2 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

export default FormattedInput;
