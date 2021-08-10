import { useEffect } from "react";
import { useRouter } from "next/router";
import { scroller, Element } from "react-scroll";
import { GetStaticProps } from "next";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import dynamic from "next/dynamic";
import Banner from "@components/common/banner";
import HomeLayout from "@components/layout/home-layout";
import BakeryFeed from "@components/product/feed-bakery";
import BakeryCategory from "@components/category/bakery-category";
import FilterBar from "@components/common/filter-bar";
import { useWindowSize } from "@utils/use-window-size";
import { sitePages, PageName } from "@settings/site-pages.settings";
import { getKeyValue } from "@utils/get-key-value";
import { fetchProducts } from "@data/product/use-products.query";
import { fetchCategories } from "@data/category/use-categories.query";
import { fetchTypes } from "@data/type/use-types.query";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { fetchSettings } from "@data/settings/use-settings.query";

const CartCounterButton = dynamic(
  () => import("@components/cart/cart-counter-button"),
  { ssr: false }
);

const PAGE_TYPE = "bakery";

export default function BakeryPage() {
  const { query } = useRouter();
  useEffect(() => {
    if (query.text || query.category) {
      scroller.scrollTo("grid", {
        smooth: true,
        offset: -110,
      });
    }
  }, [query.text, query.category]);

  const { width } = useWindowSize();
  const getPageData = getKeyValue(sitePages, PAGE_TYPE as PageName);

  return (
    <>
      <Banner banner={getPageData.banner} className="max-h-140" />
      <FilterBar />
      <Element name="grid">
        <BakeryCategory />
        <main className="flex-1">
          <BakeryFeed />
        </main>
      </Element>
      {width > 1023 && <CartCounterButton />}
    </>
  );
}

BakeryPage.Layout = HomeLayout;
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
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale!, ["common", "banner"])),
    },
    revalidate: 60,
  };
};
