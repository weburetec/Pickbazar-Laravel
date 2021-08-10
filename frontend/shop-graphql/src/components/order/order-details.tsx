import NotFound from "@components/common/not-found";
import usePrice from "@utils/use-price";
import { formatAddress } from "@utils/format-address";
import OrderStatus from "./order-status";
import { useTranslation } from "next-i18next";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import { Eye } from "@components/icons/eye-icon";
import { OrderItems } from "./order-items-table";
import isEmpty from "lodash/isEmpty";

interface Props {
  order: any;
}

const OrderDetails = ({ order }: Props) => {
  const { t } = useTranslation("common");
  const {
    products,
    status,
    shipping_address,
    billing_address,
    tracking_number,
  } = order ?? {};

  const { price: amount } = usePrice({
    amount: order?.amount,
  });
  const { price: discount } = usePrice({
    amount: order?.discount,
  });
  const { price: total } = usePrice({
    amount: order?.total,
  });
  const { price: delivery_fee } = usePrice({
    amount: order?.delivery_fee,
  });
  const { price: sales_tax } = usePrice({
    amount: order?.sales_tax,
  });

  return (
    <div className="flex flex-col w-full lg:w-2/3 border border-border-200">
      {!isEmpty(order) ? (
        <>
          <div className="flex flex-col md:flex-row items-center md:justify-between p-5 border-b border-border-200">
            <h2 className="flex font-semibold text-sm md:text-xl text-heading mb-2">
              {t("text-order-details")} <span className="px-2">-</span>{" "}
              {tracking_number}
            </h2>

            <Link
              href={`${ROUTES.ORDERS}/${tracking_number}`}
              className="font-semibold text-sm text-accent flex items-center transition duration-200 no-underline hover:text-accent-hover focus:text-accent-hover"
            >
              <Eye width={20} className="me-2" />
              {t("text-sub-orders")}
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row border-b border-border-200">
            <div className="w-full md:w-3/5 flex flex-col px-5 py-4 border-b sm:border-b-0 sm:border-r border-border-200">
              <div className="mb-4">
                <span className="text-sm text-heading font-bold mb-2 block">
                  {t("text-shipping-address")}
                </span>

                <span className="text-sm text-body">
                  {formatAddress(shipping_address)}
                </span>
              </div>

              <div>
                <span className="text-sm text-heading font-bold mb-2 block">
                  {t("text-billing-address")}
                </span>

                <span className="text-sm text-body">
                  {formatAddress(billing_address)}
                </span>
              </div>
            </div>

            <div className="w-full md:w-2/5 flex flex-col px-5 py-4">
              <div className="flex justify-between mb-3">
                <span className="text-sm text-body">{t("text-sub-total")}</span>
                <span className="text-sm text-heading">{amount}</span>
              </div>

              <div className="flex justify-between mb-3">
                <span className="text-sm text-body">{t("text-discount")}</span>
                <span className="text-sm text-heading">{discount}</span>
              </div>

              <div className="flex justify-between mb-3">
                <span className="text-sm text-body">
                  {t("text-delivery-fee")}
                </span>
                <span className="text-sm text-heading">{delivery_fee}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-sm text-body">{t("text-tax")}</span>
                <span className="text-sm text-heading">{sales_tax}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm font-bold text-heading">
                  {t("text-total")}
                </span>
                <span className="text-sm font-bold text-heading">{total}</span>
              </div>
            </div>
          </div>

          {/* Order Table */}
          <div>
            <div className="w-full flex justify-center items-center px-6">
              <OrderStatus status={status?.serial} />
            </div>
            <OrderItems products={products} />
          </div>
        </>
      ) : (
        <div className="max-w-lg mx-auto">
          <NotFound text="text-no-order-found" />
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
