import React, { InputHTMLAttributes } from "react";
import styles from "./checkbox.module.css";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  error?: string;
  name: string;
  onChange?: (...args: any[]) => any;
}

const Checkbox = React.forwardRef<HTMLInputElement, Props>(
  ({ className, label, error, name, onChange, ...rest }, ref) => {
    const handleOnChange = (e: any) => {
      if (onChange) {
        onChange(e.target.value);
      }
      return null;
    };

    return (
      <div className={className}>
        <div className="flex items-center">
          <input
            id={name}
            name={name}
            type="checkbox"
            ref={ref}
            onChange={handleOnChange}
            className={styles.checkbox}
            {...rest}
          />

          <label htmlFor={name} className="text-body text-sm">
            {label}
          </label>
        </div>

        {error && <p className="my-2 text-xs text-end text-red-500">{error}</p>}
      </div>
    );
  }
);

export default Checkbox;
