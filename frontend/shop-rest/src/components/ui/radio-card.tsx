import cn from "classnames";
import Pencil from "@components/icons/pencil";
import { CloseIcon } from "@components/icons/close-icon";

type RadioCardProps = {
  id: string;
  name: string;
  title: string;
  content?: string;
  checked?: boolean;
  onChange: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  disabled?: boolean;
  className?: string;
};

const RadioCard: React.FC<RadioCardProps> = ({
  id,
  name,
  title,
  content,
  checked,
  onChange,
  onEdit,
  onDelete,
  disabled,
  className,
}) => {
  const htmlFor = `${name}-${id}`;

  // active, disabled & center state style
  const activeClass = checked
    ? "shadow-sm border-green-600 bg-transparent"
    : "border-transparent bg-gray-100";
  const disabledClass = disabled
    ? "opacity-75 cursor-not-allowed"
    : "opacity-100 cursor-pointer group";
  const centerClass =
    title && content ? "" : "place-content-center text-center";

  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "grid gap-y-1.5 py-4 px-5 relative border border-solid rounded transition-colors duration-300",
        activeClass,
        disabledClass,
        centerClass,
        className
      )}
    >
      <input
        type="radio"
        id={htmlFor}
        name={name}
        value={content}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        className="opacity-0 invisible absolute"
      />
      {title && (
        <span className="text-sm text-heading font-semibold">{title}</span>
      )}
      {content && (
        <span className="text-sm text-body-dark" style={{ lineHeight: 1.8 }}>
          {content}
        </span>
      )}
      {onEdit || onDelete ? (
        <span className="grid grid-flow-col auto-cols-max gap-x-1.5 absolute top-2.5 end-2.5 transition duration-200 opacity-0 group-hover:opacity-100">
          {onEdit && (
            <span
              title="Edit"
              onClick={onEdit}
              className="flex items-center justify-center w-5 h-5 rounded-full bg-green-600 text-light"
            >
              <Pencil width={8.003} height={8} />
            </span>
          )}
          {onDelete && (
            <span
              title="Delete"
              onClick={onDelete}
              className="flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-light"
            >
              <CloseIcon width={8.003} height={8} />
            </span>
          )}
        </span>
      ) : null}
    </label>
  );
};

export default RadioCard;
