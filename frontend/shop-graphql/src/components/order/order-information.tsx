import CheckoutCartItem from "@components/checkout/checkout-cart-item";
import Coupon from "@components/checkout/coupon";
import { useCheckout } from "@contexts/checkout.context";
import usePrice from "@utils/use-price";
import EmptyCartIcon from "@components/icons/empty-cart";
import { CloseIcon } from "@components/icons/close-icon";
import { useTranslation } from "next-i18next";
import { useCart } from "@contexts/quick-cart/cart.context";
import {
  calculatePaidTotal,
  calculateTotal,
} from "@contexts/quick-cart/cart.utils";

interface Props {
  className?: string;
}
const OrderInformation = (props: Props) => {
  const { t } = useTranslation("common");
  const { items, isEmpty } = useCart();
  const { checkoutData, discount, removeCoupon, coupon } = useCheckout();
  const available_items = items?.filter(
    (item) => !checkoutData?.unavailable_products?.includes(item.id)
  );
  const { price: tax } = usePrice(
    checkoutData && {
      amount: checkoutData.total_tax ?? 0,
    }
  );
  const { price: shipping } = usePrice(
    checkoutData && {
      amount: checkoutData.shipping_charge ?? 0,
    }
  );
  const base_amount = calculateTotal(available_items);
  const { price: sub_total } = usePrice(
    checkoutData && {
      amount: base_amount,
    }
  );
  const { price: discountPrice } = usePrice(
    discount && {
      amount: discount,
    }
  );
  const { price: total } = usePrice(
    checkoutData && {
      amount: calculatePaidTotal(
        {
          totalAmount: base_amount,
          tax: checkoutData?.total_tax,
          shipping_charge: checkoutData?.shipping_charge,
        },
        Number(discount)
      ),
    }
  );
  return (
    <div className={props.className}>
      <div className="flex flex-col border-b pb-2 border-border-200">
        {!isEmpty ? (
          items?.map((item) => {
            const notAvailable = checkoutData?.unavailable_products?.find(
              (d: any) => d === item.id
            );
            return (
              <CheckoutCartItem
                item={item}
                key={item.id}
                notAvailable={!!notAvailable}
              />
            );
          })
        ) : (
          <EmptyCartIcon />
        )}
      </div>

      <div className="mt-4">
        <div className="flex justify-between mb-3">
          <p className="text-sm text-body">{t("text-sub-total")}</p>
          <span className="text-sm text-body">{sub_total}</span>
        </div>
        <div className="flex justify-between mb-3">
          <p className="text-sm text-body">{t("text-tax")}</p>
          <span className="text-sm text-body">{tax}</span>
        </div>
        <div className="flex justify-between mb-3">
          <p className="text-sm text-body">{t("text-shipping")}</p>
          <span className="text-sm text-body">{shipping}</span>
        </div>
        {discount ? (
          <div className="flex justify-between mb-4">
            <p className="text-sm text-body me-4">{t("text-discount")}</p>
            <span className="text-xs font-semibold text-red-500 flex items-center me-auto">
              ({coupon.code})
              <button onClick={removeCoupon}>
                <CloseIcon className="w-3 h-3 ms-2" />
              </button>
            </span>
            <span className="text-sm text-body">{discountPrice}</span>
          </div>
        ) : (
          <div className="flex justify-between mt-5 mb-4">
            <Coupon />
          </div>
        )}
        <div className="flex justify-between border-t-4 border-double border-border-200 pt-4">
          <p className="text-base font-semibold text-heading">
            {t("text-total")}
          </p>
          <span className="text-base font-semibold text-heading">{total}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderInformation;
