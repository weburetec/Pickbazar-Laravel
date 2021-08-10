import ShopCard from "@components/ui/shop-card";
import { fetchShops, useShopsQuery } from "@data/shop/use-shops.query";
import ShopPageLayout from "@components/layout/shop-layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Fragment } from "react";
import { GetStaticProps } from "next";
import { fetchSettings } from "@data/settings/use-settings.query";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";

const ShopsPage = () => {
  const { data } = useShopsQuery({
    is_active: 1,
  });
  const { t } = useTranslation("common");

  return (
    <div className="bg-light min-h-screen ">
      <div className="w-full max-w-6xl mx-auto flex flex-col p-8 pt-32 md:pt-40">
        <div className="pt-12">
          <h3 className="text-2xl text-heading font-bold mb-8">
            {t("text-all-shops")}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.pages?.map((page, idx) => {
              return (
                <Fragment key={idx}>
                  {page.data.map((shop) => (
                    <ShopCard shop={shop} key={shop.id} />
                  ))}
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

ShopsPage.Layout = ShopPageLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("settings", fetchSettings);
  await queryClient.prefetchInfiniteQuery(
    ["all-shop", { is_active: 1 }],
    fetchShops
  );
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default ShopsPage;
