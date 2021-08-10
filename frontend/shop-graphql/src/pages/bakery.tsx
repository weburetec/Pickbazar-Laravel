import Banner from "@components/common/banner";
import HomeLayout from "@components/layout/home-layout";
import ProductFeed from "@components/product/feed-bakery";
import { addApolloState, initializeApollo } from "@utils/apollo";
import { getCategoriesInServer } from "@operations/category";
import { getProductsInServer } from "@operations/product";
import { GetStaticProps } from "next";
import BakeryCategory from "@components/category/bakery-category";
import FilterBar from "@components/common/filter-bar";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { scroller, Element } from "react-scroll";
import { useWindowSize } from "@utils/use-window-size";
import { sitePages, PageName } from "@settings/site-pages.settings";
import { getKeyValue } from "@utils/get-key-value";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SettingsDocument } from "@graphql/settings.graphql";

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
          <ProductFeed />
        </main>
      </Element>
      {width > 1023 && <CartCounterButton />}
    </>
  );
}

BakeryPage.Layout = HomeLayout;

// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: SettingsDocument,
  });
  await apolloClient.query(getProductsInServer({ type: PAGE_TYPE, limit: 21 }));
  await apolloClient.query(
    getCategoriesInServer({ type: PAGE_TYPE, limit: 100 })
  );
  return addApolloState(apolloClient, {
    props: {
      ...(await serverSideTranslations(locale!, ["common", "banner"])),
    },
    revalidate: 120,
  });
};
