import { useState } from "react";
import cn from "classnames";

type SwitchProps = {
  label?: string;
  name?: string;
  value?: string;
  disabled?: boolean;
  className?: string;
  onChange: (checked: boolean) => void;
  defaultChecked: boolean;
};

const Switch: React.FC<SwitchProps> = ({
  label,
  name,
  value,
  disabled,
  onChange,
  className,
  defaultChecked,
  ...rest
}) => {
  const [state, setState] = useState<boolean | undefined>(defaultChecked);
  const htmlFor = label ? label.replace(/\s+/g, "_").toLowerCase() : "";

  function handleSwitchState(switchState: boolean) {
    setState(switchState);
    onChange(switchState);
  }

  const onInternalKeyDown = (e: any) => {
    // skip prevent default when press tab key
    if (e.keyCode !== 9) {
      e.preventDefault();
    }
    // when space bar key pressed
    if (e.keyCode === 32) {
      handleSwitchState(!state);
    }
    // when left arrow key pressed
    if (e.keyCode === 37) {
      handleSwitchState(false);
    }
    // when right arrow key pressed
    if (e.keyCode === 39) {
      handleSwitchState(true);
    }
  };

  // active & disabled state style
  const disabledClass = disabled
    ? "opacity-75 cursor-not-allowed"
    : "opacity-100 cursor-pointer group";
  const switchLine = state ? "bg-accent" : "bg-gray-50";
  const switchDot = state ? "translate-x-8" : "bg-gray-600 translate-x-0";

  return (
    <div className={cn(disabledClass, className)}>
      <label htmlFor={htmlFor}>
        <span className="rq-switch-label cursor-pointer">{label}</span>
        <input
          className="opacity-0 invisible absolute"
          type="checkbox"
          id={htmlFor}
          name={name}
          value={value}
          checked={state}
          disabled={disabled}
          onChange={() => handleSwitchState(!state)}
          {...rest}
        />
        <span
          tabIndex={0}
          onKeyDown={onInternalKeyDown}
          className={cn(
            "rq-switch-field cursor-pointer block relative w-16 h-8 rounded-full overflow-hidden transition-colors duration-300 focus:outline-none ring-1 ring-gray-400 ring-opacity-25",
            !disabled && "focus:ring-2",
            switchLine
          )}
        >
          <span
            className={cn(
              "block w-7 h-7 m-0.5 bg-light rounded-full transform transition-transform duration-200",
              switchDot
            )}
          />
        </span>
      </label>
    </div>
  );
};

export default Switch;
