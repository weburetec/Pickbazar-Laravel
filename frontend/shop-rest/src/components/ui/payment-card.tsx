import cn from "classnames";
import { CloseIcon } from "@components/icons/close-icon";
import { useTranslation } from "next-i18next";

type PaymentCardProps = {
  id: string;
  name: string;
  cardType: string;
  checked?: boolean;
  disabled?: boolean;
  lastFourDigit: string;
  cardHolderName: string;
  onChange: () => void;
  onDelete?: () => void;
  className?: string;
};

const PaymentCard: React.FC<PaymentCardProps> = ({
  id,
  name,
  checked,
  disabled,
  cardType,
  cardHolderName,
  lastFourDigit,
  onChange,
  onDelete,
  className,
}) => {
  const { t } = useTranslation("common");
  const htmlFor = `${name}-${id}`;
  const cardLogo = `/${[cardType]}.png`;

  // active & disabled state style
  const activeClass = checked
    ? "shadow-sm border-green-600 bg-transparent"
    : "border-transparent bg-gray-100";
  const disabledClass = disabled
    ? "opacity-75 cursor-not-allowed"
    : "opacity-100 cursor-pointer group";

  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "grid py-4 px-5 relative border border-solid rounded transition-colors duration-300",
        activeClass,
        disabledClass,
        className
      )}
    >
      <input
        type="radio"
        id={htmlFor}
        name={name}
        value={`payment-card-${id}`}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        className="opacity-0 invisible absolute"
      />

      <span className="grid">
        <img className="mb-5" src={cardLogo} alt={cardType} />
        <span className="text-xs mb-2 text-body">{t("text-card-number")}</span>
        <span className="text-heading mb-1.5 flex items-center justify-between">
          <span>****</span>
          <span>****</span>
          <span>****</span>
          <span className="text-xs font-bold">{lastFourDigit}</span>
        </span>
        <span className="text-xs text-heading font-bold">{cardHolderName}</span>
      </span>

      {onDelete && (
        <span
          title="Delete"
          onClick={onDelete}
          className="flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-light absolute top-2.5 end-2.5 transition duration-200 opacity-0 group-hover:opacity-100 focus:outline-none hover:opacity-75"
        >
          <CloseIcon width="8.003" height="8" />
        </span>
      )}
    </label>
  );
};

export default PaymentCard;
