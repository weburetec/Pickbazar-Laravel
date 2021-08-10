import usePrice from "@utils/use-price";
import cn from "classnames";
import { useTranslation } from "next-i18next";
interface Props {
  item: any;
  notAvailable?: boolean;
}

const CheckoutCartItem = ({ item, notAvailable }: Props) => {
  const { t } = useTranslation("common");
  const { price } = usePrice({
    amount: item.itemTotal,
  });
  return (
    <div className={cn("flex justify-between py-2")} key={item.id}>
      <p className="flex items-center justify-between text-base">
        <span
          className={cn("text-sm", notAvailable ? "text-red-500" : "text-body")}
        >
          <span
            className={cn(
              "text-sm font-bold",
              notAvailable ? "text-red-500" : "text-heading"
            )}
          >
            {item.quantity}
          </span>
          <span className="mx-2">x</span>
          <span>{item.name}</span> | <span>{item.unit}</span>
        </span>
      </p>
      <span
        className={cn("text-sm", notAvailable ? "text-red-500" : "text-body")}
      >
        {!notAvailable ? price : t("text-unavailable")}
      </span>
    </div>
  );
};

export default CheckoutCartItem;
