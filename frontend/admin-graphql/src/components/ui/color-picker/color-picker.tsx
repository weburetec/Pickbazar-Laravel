import cn from "classnames";
import React, { InputHTMLAttributes, useState } from "react";
import styles from "./color-picker.module.css";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  label?: string;
  name: string;
  error?: string;
  onChange?: (...args: any[]) => any;
}

const ColorPicker = React.forwardRef<HTMLInputElement, Props>(
  (
    { className, label, name, error, inputClassName, onChange, ...rest },
    ref
  ) => {
    const [color, setColor] = useState("#d87b64");

    const handleOnChange = (e: any) => {
      setColor(e.target.value);
      if (onChange) {
        onChange(e.target.value);
      }
      return null;
    };
    return (
      <div className={className}>
        <label
          htmlFor={name}
          className="block text-body-dark font-semibold text-sm leading-none mb-3"
        >
          {label}
        </label>
        <div className="flex items-center">
          <input
            id={name}
            name={name}
            type="color"
            ref={ref}
            className={cn(styles.color_picker, inputClassName)}
            onChange={handleOnChange}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            aria-invalid={error ? "true" : "false"}
            {...rest}
          />
          {color !== null && (
            <span className="ms-3 px-2 py-1 text-sm text-heading bg-gray-100 border border-border-200 rounded">
              {color}
            </span>
          )}
        </div>
        {error && <p className="my-2 text-xs text-end text-red-500">{error}</p>}
      </div>
    );
  }
);

export default ColorPicker;
