import Link from "@components/ui/link";
import PaymentForm from "@components/checkout/payment-form";
import Layout from "@components/layout/layout";
import OrderInformation from "@components/order/order-information";
import EmptyCartIcon from "@components/icons/empty-cart";
import { parseContextCookie } from "@utils/parse-cookie";
import { GetServerSideProps } from "next";
import { ROUTES } from "@utils/routes";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useCart } from "@contexts/quick-cart/cart.context";

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

const OrderPage = () => {
  const { t } = useTranslation("common");
  const { isEmpty } = useCart();
  if (isEmpty) {
    return (
      <div
        className="flex flex-col items-center justify-center mb-4"
        style={{ height: "calc(100vh - 85px)" }}
      >
        <EmptyCartIcon width={180} height={236} />
        <h4 className="my-4 text-lg text-heading">
          {t("error-cart-empty")}{" "}
          <Link
            href={ROUTES.HOME}
            className="text-accent font-semibold hover:text-accent-hover"
          >
            {t("text-home")}
          </Link>
        </h4>
      </div>
    );
  }
  return (
    <div className="py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
      <div className="flex flex-col lg:flex-row items-center lg:items-start m-auto lg:space-s-8 w-full max-w-5xl">
        <div className="lg:max-w-2xl w-full space-y-6 order-2 lg:order-1">
          <div className="shadow-700 bg-light p-5 md:p-8">
            <PaymentForm />
          </div>
        </div>
        <div className="w-full lg:w-96 order-1 lg:order-2 mb-10 sm:mb-12 lg:mb-0">
          <OrderInformation />
        </div>
      </div>
    </div>
  );
};

OrderPage.Layout = Layout;

export default OrderPage;
