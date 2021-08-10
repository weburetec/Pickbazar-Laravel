import { forwardRef } from "react";
import cn from "classnames";
import Cleave from "cleave.js/react";
import { useTranslation } from "next-i18next";
import "cleave.js/dist/addons/cleave-phone.us";

interface PhoneNumberInputProps {
  name: string;
  label: string;
  error?: string;
  variant?: "normal" | "solid" | "outline";
  className?: string;
  inputClassName?: string;
  shadow?: boolean;
}

const variantClasses = {
  normal:
    "bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent",
  solid:
    "bg-gray-100 border border-border-100 focus:bg-light focus:border-accent",
  outline: "border border-border-base focus:border-accent",
};

const PhoneNumberInput = forwardRef<HTMLInputElement, PhoneNumberInputProps>(
  (
    {
      name,
      label,
      error,
      variant = "normal",
      className,
      inputClassName,
      shadow = false,
    },
    ref
  ) => {
    const { t } = useTranslation();
    return (
      <div className={className}>
        <label htmlFor={name} className="block mb-2 text-sm text-body">
          {t(label)}
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
          options={{ phone: true, phoneRegionCode: "US" }}
          //@ts-ignore
          htmlRef={ref}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          aria-invalid={error ? "true" : "false"}
        />
        {error && <p className="my-2 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

export default PhoneNumberInput;
