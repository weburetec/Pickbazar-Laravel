import Banner from "@components/common/banner";
import HomeLayout from "@components/layout/home-layout";
import PromotionSlider from "@components/common/promotion-slider";
import ProductFeed from "@components/product/feed";
import { addApolloState, initializeApollo } from "@utils/apollo";
import { LIMIT } from "@utils/constants";
import { getCategoriesInServer } from "@operations/category";
import { getProductsInServer } from "@operations/product";
import { GetStaticPathsContext, GetStaticProps } from "next";
import CategoryDropdownSidebar from "@components/category/category-dropdown-sidebar";
import FilterBar from "@components/common/filter-bar";
import { TypesDocument } from "@graphql/types.graphql";
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
export default function HomePage() {
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
  const PAGE_TYPE = query.type?.toString();
  const getPageData = getKeyValue(sitePages, PAGE_TYPE as PageName);

  return (
    <>
      <Banner banner={getPageData.banner} className="min-h-screen" />
      <PromotionSlider />
      <FilterBar />
      <Element
        name="grid"
        className="flex flex-1 border-t border-solid border-border-200 border-opacity-70"
      >
        <CategoryDropdownSidebar />
        <main className="flex-1">
          <ProductFeed />
        </main>
      </Element>
      {width > 1023 && <CartCounterButton />}
    </>
  );
}

HomePage.Layout = HomeLayout;
// This function gets called at build time
export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const apolloClient = initializeApollo();
  // array of type
  const { data } = await apolloClient.query({
    query: TypesDocument,
  });
  // Get the paths we want to pre-render based on types
  const paths = data?.types
    ?.filter((t: any) => t.slug !== "bakery")
    .flatMap((type: any) =>
      locales?.map((locale) => ({ params: { type: type.slug }, locale }))
    );

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: "blocking" };
}
// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: SettingsDocument,
  });
  await apolloClient.query({
    query: TypesDocument,
  });
  await apolloClient.query(
    getProductsInServer({ type: params?.type as string, limit: LIMIT })
  );
  await apolloClient.query(
    getCategoriesInServer({ type: params?.type as string, limit: 100 })
  );
  return addApolloState(apolloClient, {
    props: {
      ...(await serverSideTranslations(locale!, ["common", "banner"])),
    },
    revalidate: 120,
  });
};
