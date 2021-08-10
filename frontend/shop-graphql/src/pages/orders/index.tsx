import { useEffect, useState } from "react";
import Layout from "@components/layout/layout";
import ProfileSidebar from "@components/profile/profile-sidebar";
import OrderCard from "@components/order/order-card";
import ErrorMessage from "@components/ui/error-message";
import OrderDetails from "@components/order/order-details";
import Collapse, { Panel } from "rc-collapse";
import "rc-collapse/assets/index.css";
import { GetServerSideProps } from "next";
import { parseContextCookie } from "@utils/parse-cookie";
import Spinner from "@components/ui/loaders/spinner/spinner";
import Scrollbar from "@components/ui/scrollbar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useOrdersQuery } from "@graphql/orders.graphql";
import { NetworkStatus } from "@apollo/client";
import Button from "@components/ui/button";
import NotFound from "@components/common/not-found";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const cookies = parseContextCookie(context?.req?.headers?.cookie);
  if (!cookies?.auth_token) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  };
};

export default function OrdersPage() {
  const { t } = useTranslation("common");
  const [order, setOrder] = useState<any>({});
  const { data, loading, error, networkStatus, fetchMore } = useOrdersQuery({
    variables: {
      first: 10,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data?.orders?.data?.length) {
      setOrder(data.orders.data[0]);
    }
  }, [data?.orders?.data?.length]);
  if (error) return <ErrorMessage message={error.message} />;
  const loadingMore = networkStatus === NetworkStatus.fetchMore;
  function handleLoadMore() {
    if (data?.orders?.paginatorInfo.hasMorePages) {
      fetchMore({
        variables: {
          page: data?.orders?.paginatorInfo?.currentPage + 1,
        },
      });
    }
  }
  return (
    <div className="w-full bg-light">
      <div className="flex flex-col xl:flex-row items-start max-w-1920 w-full mx-auto py-10 px-5 xl:py-14 xl:px-8 2xl:px-14 min-h-screen">
        <ProfileSidebar className="flex-shrink-0 hidden xl:block xl:w-80 me-8" />
        {/* End of sidebar navigation */}

        <div className="w-full hidden overflow-hidden lg:flex">
          <div
            className="pe-5 lg:pe-8 w-full md:w-1/3"
            style={{ height: "calc(100vh - 60px)" }}
          >
            <div className="flex flex-col h-full pb-5 md:border md:border-border-200">
              <h3 className="text-xl font-semibold py-5 text-heading px-5">
                {t("profile-sidebar-orders")}
              </h3>
              <Scrollbar
                className="w-full"
                style={{ height: "calc(100% - 80px)" }}
              >
                {loading && !data?.orders?.data?.length ? (
                  <p>
                    <Spinner showText={false} />
                  </p>
                ) : (
                  <div className="px-5">
                    {data?.orders?.data?.map((_order, index) => (
                      <OrderCard
                        key={index}
                        order={_order}
                        onClick={() => setOrder(_order)}
                        isActive={order?.id === _order?.id}
                      />
                    ))}
                    {data?.orders?.paginatorInfo?.hasMorePages && (
                      <div className="flex justify-center mt-8 lg:mt-12">
                        <Button
                          loading={loadingMore}
                          onClick={handleLoadMore}
                          className="text-sm md:text-base font-semibold h-11"
                        >
                          {t("text-load-more")}
                        </Button>
                      </div>
                    )}
                  </div>
                )}
                {!loading && !data?.orders?.data?.length && (
                  <div className="w-full h-full flex items-center justify-center my-auto">
                    <h4 className="text-sm font-semibold text-body text-center">
                      {t("error-no-orders")}
                    </h4>
                  </div>
                )}
              </Scrollbar>
            </div>
          </div>
          {/* End of Order List */}
          {!!data?.orders?.data?.length ? (
            <OrderDetails order={order} />
          ) : (
            <div className="max-w-lg mx-auto">
              <NotFound text="text-no-order-found" />
            </div>
          )}
        </div>

        {/* Order Card Mobile */}
        <div className="flex flex-col w-full lg:hidden">
          <div className="flex flex-col w-full h-full px-0 pb-5">
            <h3 className="text-xl font-semibold pb-5 text-heading">
              {t("profile-sidebar-orders")}
            </h3>
            <Collapse
              accordion={true}
              defaultActiveKey="active"
              expandIcon={() => null}
            >
              {loading && !data?.orders?.data?.length ? (
                <p>
                  <Spinner showText={false} />
                </p>
              ) : (
                data?.orders?.data?.map((_order, index) => (
                  <Panel
                    header={
                      <OrderCard
                        key={`mobile_${index}`}
                        order={_order}
                        onClick={() => setOrder(_order)}
                        isActive={order?.id === _order?.id}
                      />
                    }
                    headerClass="accordion-title"
                    key={index}
                    className="mb-4"
                  >
                    <OrderDetails order={order} />
                  </Panel>
                ))
              )}
              {data?.orders?.paginatorInfo?.hasMorePages && (
                <div className="flex justify-center mt-8 lg:mt-12">
                  <Button
                    loading={loadingMore}
                    onClick={handleLoadMore}
                    className="text-sm md:text-base font-semibold h-11"
                  >
                    {t("text-load-more")}
                  </Button>
                </div>
              )}
            </Collapse>

            {!loading && !data?.orders?.data?.length && (
              <div className="w-full h-full flex flex-col items-center justify-center py-10 my-auto">
                <div className="w-5/6 h-full flex items-center justify-center mb-7">
                  <img
                    src="/no-result.svg"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h4 className="text-sm font-semibold text-body text-center">
                  {t("error-no-orders")}
                </h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

OrdersPage.Layout = Layout;
