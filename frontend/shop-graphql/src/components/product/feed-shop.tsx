import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useProductsQuery } from "@graphql/products.graphql";
import { NetworkStatus } from "@apollo/client";
import { getMoreProducts } from "@operations/product";
import Button from "@components/ui/button";
import ErrorMessage from "@components/ui/error-message";
import { LIMIT } from "@utils/constants";
import renderProductCard from "@components/product/render-product-card";
import NotFound from "@components/common/not-found";
import { useTranslation } from "next-i18next";
import { QueryProductsOrderByColumn } from "@graphql/products.graphql";
import { SortOrder } from "@graphql/address.graphql";

const ProductFeedLoader = dynamic(
  () => import("@components/ui/loaders/product-feed-loader")
);

const ShopProductFeed = ({ shopId }: { shopId: string }) => {
  const { t } = useTranslation("common");
  const { data, loading, error, fetchMore, networkStatus } = useProductsQuery({
    skip: !Boolean(shopId),
    variables: {
      shop_id: Number(shopId),
      orderBy: [
        {
          column: QueryProductsOrderByColumn.CreatedAt,
          order: SortOrder.Asc,
        },
      ],
    },
    notifyOnNetworkStatusChange: true,
  });

  if (error) return <ErrorMessage message={error.message} />;
  const loadingMore = networkStatus === NetworkStatus.fetchMore;
  function handleLoadMore() {
    if (data?.products?.paginatorInfo.hasMorePages) {
      fetchMore(
        getMoreProducts({
          page: data?.products?.paginatorInfo?.currentPage + 1,
          first: LIMIT,
        })
      );
    }
  }

  if (!loading && !data?.products?.data?.length) {
    return (
      <div className="bg-gray-100 pt-6 pb-8 px-4 lg:p-8">
        <NotFound text="text-not-found" className="w-7/12 mx-auto" />
      </div>
    );
  }
  return (
    <div className="bg-gray-100 pt-6 pb-8 lg:py-8">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-3">
        {loading && !data?.products?.data.length ? (
          <ProductFeedLoader limit={20} />
        ) : (
          data?.products?.data?.map((product, idx) => (
            <motion.div key={idx}>{renderProductCard(product)}</motion.div>
          ))
        )}
      </div>
      {data?.products?.paginatorInfo?.hasMorePages && (
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
  );
};

export default ShopProductFeed;
