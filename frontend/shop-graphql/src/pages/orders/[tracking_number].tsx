import { useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import Link from "@components/ui/link";
import Layout from "@components/layout/layout";
import { useOrderQuery } from "@graphql/orders.graphql";
import usePrice from "@utils/use-price";
import { formatAddress } from "@utils/format-address";
import { formatString } from "@utils/format-string";
import { parseContextCookie } from "@utils/parse-cookie";
import { useCheckout } from "@contexts/checkout.context";
import Spinner from "@components/ui/loaders/spinner/spinner";
import { ROUTES } from "@utils/routes";
import { useSearch } from "@contexts/search.context";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useCart } from "@contexts/quick-cart/cart.context";
import { CheckMark } from "@components/icons/checkmark";
import { useIsRTL } from "@utils/locals";
import { Table } from "@components/ui/table";
import Badge from "@components/ui/badge";
import { OrderItems } from "@components/order/order-items-table";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const cookies = parseContextCookie(context?.req?.headers?.cookie);
  if (!cookies?.auth_token) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale!, ["common"])),
    },
  };
};

export default function OrderPage() {
  const { t } = useTranslation("common");
  const { query } = useRouter();
  const { resetCart } = useCart();
  const { clearCheckoutData } = useCheckout();
  const { updateSearchTerm } = useSearch();
  const { alignLeft, alignRight } = useIsRTL();

  useEffect(() => {
    resetCart();
    clearCheckoutData();
    updateSearchTerm("");
  }, []);

  const { data, loading } = useOrderQuery({
    variables: {
      tracking_number: query.tracking_number as string,
    },
  });

  const { price: total } = usePrice(
    data && { amount: data?.order?.paid_total! }
  );
  const { price: sub_total } = usePrice(
    data && { amount: data?.order?.amount! }
  );
  const { price: shipping_charge } = usePrice(
    data && { amount: data?.order?.delivery_fee ?? 0 }
  );
  const { price: tax } = usePrice(
    data && { amount: data?.order?.sales_tax ?? 0 }
  );
  const { price: discount } = usePrice(
    data && { amount: data?.order?.discount ?? 0 }
  );

  const orderTableColumns = [
    {
      title: t("text-tracking-number"),
      dataIndex: "tracking_number",
      key: "tracking_number",
      align: alignLeft,
    },
    {
      title: t("text-date"),
      dataIndex: "date",
      key: "date",
      align: alignLeft,
      render: (created_at: string) => dayjs(created_at).format("MMMM D, YYYY"),
    },
    {
      title: t("text-status"),
      dataIndex: "status",
      key: "status",
      align: alignLeft,
      render: (status: any) => (
        <Badge text={status?.name} style={{ backgroundColor: status?.color }} />
      ),
    },
    {
      title: t("text-item"),
      dataIndex: "products",
      key: "products",
      align: alignLeft,
      render: (products: any) => formatString(products?.length, t("text-item")),
    },
    {
      title: t("text-total-price"),
      dataIndex: "paid_total",
      key: "paid_total",
      align: alignRight,
      // width: 100,
      render: (paid_total: any) => {
        const { price } = usePrice(data && { amount: paid_total });
        return <p>{price}</p>;
      },
    },
    {
      title: "",
      dataIndex: "tracking_number",
      key: "tracking_number",
      align: alignRight,
      // width: 100,
      render: (tracking_number: string) => (
        <Link
          href={`${ROUTES.ORDERS}/${tracking_number}`}
          className="inline-flex items-center justify-center flex-shrink-0 font-semibold leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow bg-gray-700 text-light border border-transparent hover:bg-gray-900 px-4 py-0 h-10 text-sm"
        >
          {t("text-view")}
        </Link>
      ),
    },
  ];

  if (loading) {
    return <Spinner showText={false} />;
  }
  return (
    <div className="p-4 sm:p-8">
      <div className="p-6 sm:p-8 lg:p-12 max-w-screen-lg w-full mx-auto bg-light rounded border shadow-sm">
        <h2 className="flex flex-col sm:flex-row items-center justify-between text-base font-bold text-heading mb-9 sm:mb-12">
          <span className="mb-5 sm:mb-0 me-auto ">
            <span className="me-4">{t("text-status")} :</span>
            <Badge
              text={data?.order?.status?.name!}
              className="font-normal text-sm whitespace-nowrap"
            />
          </span>
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center text-accent text-base font-normal underline hover:no-underline hover:text-accent-hover"
          >
            {t("text-back-to-home")}
          </Link>
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          <div className="py-4 px-5 border border-border-200 rounded shadow-sm">
            <h3 className="mb-2 text-sm text-heading font-semibold">
              {t("text-order-number")}
            </h3>
            <p className="text-sm  text-body-dark">
              {data?.order?.tracking_number}
            </p>
          </div>
          <div className="py-4 px-5 border border-border-200 rounded shadow-sm">
            <h3 className="mb-2 text-sm  text-heading font-semibold">
              {t("text-date")}
            </h3>
            <p className="text-sm text-body-dark">
              {dayjs(data?.order?.created_at).format("MMMM D, YYYY")}
            </p>
          </div>
          <div className="py-4 px-5 border border-border-200 rounded shadow-sm">
            <h3 className="mb-2 text-sm  text-heading font-semibold">
              {t("text-total")}
            </h3>
            <p className="text-sm  text-body-dark">{total}</p>
          </div>
          <div className="py-4 px-5 border border-border-200 rounded shadow-sm">
            <h3 className="mb-2 text-sm  text-heading font-semibold">
              {t("text-payment-method")}
            </h3>
            <p className="text-sm text-body-dark">
              {data?.order?.payment_gateway ?? "N/A"}
            </p>
          </div>
        </div>
        {/* end of order received  */}

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 lg:pe-3 mb-12 lg:mb-0">
            <h2 className="text-xl font-bold text-heading mb-6">
              {t("text-total-amount")}
            </h2>
            <div>
              <p className="flex text-body-dark mt-5">
                <strong className="w-5/12 sm:w-4/12 text-sm  text-heading font-semibold">
                  {t("text-sub-total")}
                </strong>
                :
                <span className="w-7/12 sm:w-8/12 ps-4 text-sm ">
                  {sub_total}
                </span>
              </p>
              <p className="flex text-body-dark mt-5">
                <strong className="w-5/12 sm:w-4/12 text-sm  text-heading font-semibold">
                  {t("text-shipping-charge")}
                </strong>
                :
                <span className="w-7/12 sm:w-8/12 ps-4 text-sm ">
                  {shipping_charge}
                </span>
              </p>
              <p className="flex text-body-dark mt-5">
                <strong className="w-5/12 sm:w-4/12 text-sm  text-heading font-semibold">
                  {t("text-tax")}
                </strong>
                :<span className="w-7/12 sm:w-8/12 ps-4 text-sm ">{tax}</span>
              </p>
              <p className="flex text-body-dark mt-5">
                <strong className="w-5/12 sm:w-4/12 text-sm  text-heading font-semibold">
                  {t("text-discount")}
                </strong>
                :
                <span className="w-7/12 sm:w-8/12 ps-4 text-sm ">
                  {discount}
                </span>
              </p>
              <p className="flex text-body-dark mt-5">
                <strong className="w-5/12 sm:w-4/12 text-sm  text-heading font-semibold">
                  {t("text-total")}
                </strong>
                :<span className="w-7/12 sm:w-8/12 ps-4 text-sm">{total}</span>
              </p>
            </div>
          </div>
          {/* end of total amount */}

          <div className="w-full lg:w-1/2 lg:ps-3">
            <h2 className="text-xl font-bold text-heading mb-6">
              {t("text-order-details")}
            </h2>
            <div>
              <p className="flex text-body-dark mt-5">
                <strong className="w-4/12 text-sm  text-heading font-semibold">
                  {t("text-total-item")}
                </strong>
                :
                <span className="w-8/12 ps-4 text-sm ">
                  {formatString(data?.order?.products?.length, t("text-item"))}
                </span>
              </p>
              <p className="flex text-body-dark mt-5">
                <strong className="w-4/12 text-sm  text-heading font-semibold">
                  {t("text-deliver-time")}
                </strong>
                :
                <span className="w-8/12 ps-4 text-sm ">
                  {data?.order?.delivery_time}
                </span>
              </p>
              <p className="flex text-body-dark mt-5">
                <strong className="w-4/12 text-sm text-heading font-semibold">
                  {t("text-shipping-address")}
                </strong>
                :
                <span className="w-8/12 ps-4 text-sm ">
                  {formatAddress(data?.order?.shipping_address!)}
                </span>
              </p>
            </div>
          </div>
          {/* end of order details */}
        </div>
        <div className="mt-12">
          <OrderItems products={data?.order?.products} />
        </div>
        {data?.order?.children?.length ? (
          <div>
            <h2 className="text-xl font-bold text-heading mt-12 mb-6">
              {t("text-sub-orders")}
            </h2>
            <div>
              <div className="flex items-start border border-gray-700 rounded p-4 mb-12">
                <span className="w-4 h-4 px-2 rounded-sm bg-dark flex items-center justify-center me-3 mt-0.5">
                  <CheckMark className="w-2 h-2 text-light flex-shrink-0" />
                </span>
                <p className="text-heading text-sm">
                  <span className="font-bold">{t("text-note")}:</span>{" "}
                  {t("message-sub-order")}
                </p>
              </div>
              {Array.isArray(data?.order?.children) &&
                data?.order?.children.length && (
                  <div className="">
                    <Table
                      //@ts-ignore
                      columns={orderTableColumns}
                      emptyText={t("table:empty-table-data")}
                      //@ts-ignore
                      data={data?.order?.children}
                      rowKey="id"
                      scroll={{ x: 800 }}
                    />
                  </div>
                )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

OrderPage.Layout = Layout;
