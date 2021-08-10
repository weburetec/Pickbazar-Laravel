import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Button from "@components/ui/button";
import ErrorMessage from "@components/ui/error-message";
import NotFound from "@components/common/not-found";
import { useProductsQuery } from "@data/product/use-products.query";
import { Fragment } from "react";
import { useTranslation } from "next-i18next";

const ProductFeedLoader = dynamic(
  () => import("@components/ui/loaders/product-feed-loader")
);
const Neon = dynamic(() => import("@components/product/product-card/neon"));
const Xenon = dynamic(() => import("@components/product/product-card/xenon"));

const FeedLayoutTwo = () => {
  const { t } = useTranslation("common");
  const { query, pathname } = useRouter();
  const {
    isFetching: loading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useProductsQuery({
    type: pathname === "/grocery-two" ? "grocery" : "furniture",
    text: query?.text as string,
    category: query?.category as string,
    limit: 21,
  });

  if (error) return <ErrorMessage message={error.message} />;

  function handleLoadMore() {
    fetchNextPage();
  }

  if (!loading && !data?.pages?.[0]?.data?.length) {
    return (
      <div className="bg-gray-100 min-h-full pt-6 pb-8 px-4 lg:p-8">
        <NotFound text="text-not-found" className="w-7/12 mx-auto" />
      </div>
    );
  }

  const renderProductCard = (product: any) => {
    switch (product?.type?.slug) {
      case "grocery":
        return <Neon product={product} />;
      default:
        return <Xenon product={product} />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-full pt-6 pb-8 px-4 lg:py-6 lg:ps-0 lg:pe-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-3">
        {loading && !data?.pages?.length ? (
          <ProductFeedLoader limit={20} />
        ) : (
          <>
            {data?.pages?.map((products, _idx) => (
              <Fragment key={_idx}>
                {products?.data?.map((product) => (
                  <motion.div key={product.id}>
                    {renderProductCard(product)}
                  </motion.div>
                ))}
              </Fragment>
            ))}
          </>
        )}
      </div>
      {hasNextPage && (
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

export default FeedLayoutTwo;
