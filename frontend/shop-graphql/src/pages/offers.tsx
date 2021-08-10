import { NetworkStatus } from "@apollo/client";
import Button from "@components/ui/button";
import Layout from "@components/layout/layout";
import CouponCard from "@components/ui/coupon-card";
import ErrorMessage from "@components/ui/error-message";
import { useCouponsQuery } from "@graphql/coupons.graphql";
import CartCounterButton from "@components/cart/cart-counter-button";
import CouponFeedLoader from "@components/ui/loaders/coupon-feed-loader";
import NotFound from "@components/common/not-found";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
export default function OfferPage() {
  const { t } = useTranslation("common");
  const { data, loading, error, fetchMore, networkStatus } = useCouponsQuery({
    variables: {
      first: 16,
    },
    notifyOnNetworkStatusChange: true,
  });
  const loadingMore = networkStatus === NetworkStatus.fetchMore;
  if (error) return <ErrorMessage message={error.message} />;

  function handleLoadMore() {
    if (data?.coupons?.paginatorInfo?.currentPage) {
      fetchMore({
        variables: {
          page: data?.coupons?.paginatorInfo?.currentPage + 1,
        },
      });
    }
  }

  if (!loading && !data?.coupons?.data?.length) {
    return (
      <div className="bg-gray-100 min-h-full pt-6 pb-8 px-4 lg:p-8">
        <NotFound text="text-no-coupon" className="h-96" />
      </div>
    );
  }

  return (
    <>
      <div className="max-w-1920 w-full mx-auto py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-5 xl:gap-8">
          {loading ? (
            <CouponFeedLoader limit={20} />
          ) : (
            data?.coupons?.data?.map((item) => (
              <CouponCard key={item.id} coupon={item} />
            ))
          )}
        </div>
        {data?.coupons?.paginatorInfo.hasMorePages && (
          <div className="flex items-center justify-center mt-8 lg:mt-12">
            <Button onClick={handleLoadMore} loading={loadingMore}>
              {t("text-load-more")}
            </Button>
          </div>
        )}
      </div>
      <CartCounterButton />
    </>
  );
}

OfferPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
