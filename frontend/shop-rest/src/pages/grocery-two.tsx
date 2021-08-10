import BoxCategory from "@components/category/box-category";
import FeedLayoutTwo from "@components/product/feed-layout-two";
import FilterBarLayoutTwo from "@components/common/filter-bar-layout-two";
import BannerShort from "@components/common/banner-short";
import HomeLayout from "@components/layout/home-layout";
import { GetStaticProps } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { scroller, Element } from "react-scroll";
import { useWindowSize } from "@utils/use-window-size";
import { sitePages, PageName } from "@settings/site-pages.settings";
import { getKeyValue } from "@utils/get-key-value";
import { QueryClient } from "react-query";
import { fetchProducts } from "@data/product/use-products.query";
import { fetchCategories } from "@data/category/use-categories.query";
import { fetchTypes } from "@data/type/use-types.query";
import { dehydrate } from "react-query/hydration";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { fetchSettings } from "@data/settings/use-settings.query";

const CartCounterButton = dynamic(
  () => import("@components/cart/cart-counter-button"),
  { ssr: false }
);
const PAGE_TYPE = "grocery";

export default function GroceryPage() {
  const { query } = useRouter();
  useEffect(() => {
    if (query.text || query.category) {
      scroller.scrollTo("grid", {
        smooth: true,
        offset: -88,
      });
    }
  }, [query.text, query.category]);

  const { width } = useWindowSize();
  const getPageData = getKeyValue(sitePages, PAGE_TYPE as PageName);

  return (
    <>
      <NextSeo
        title={getPageData.title}
        description={getPageData.description}
      />
      <div className="flex flex-1 lg:pt-[80px] bg-gray-100">
        <div className="sticky top-22 h-full lg:w-[380px] hidden xl:block bg-gray-100">
          <BoxCategory />
        </div>

        <main className="w-full overflow-hidden block lg:mt-6">
          <BannerShort banner={getPageData.banner} className="max-h-140" />
          <FilterBarLayoutTwo />
          <Element name="grid">
            <FeedLayoutTwo />
          </Element>
        </main>
      </div>
      {width > 1023 && <CartCounterButton />}
    </>
  );
}

GroceryPage.Layout = HomeLayout;

// This function gets called at build time
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("settings", fetchSettings, {
    staleTime: 60 * 1000,
  });

  await queryClient.prefetchInfiniteQuery(
    ["products", { type: PAGE_TYPE, limit: 21 }],
    fetchProducts,
    {
      staleTime: 10 * 1000,
    }
  );
  await queryClient.prefetchQuery(
    ["categories", { type: PAGE_TYPE }],
    fetchCategories,
    {
      staleTime: 10 * 1000,
    }
  );
  await queryClient.prefetchQuery("types", fetchTypes, {
    staleTime: 10 * 1000,
  });

  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common", "banner"])),
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 60,
  };
};
