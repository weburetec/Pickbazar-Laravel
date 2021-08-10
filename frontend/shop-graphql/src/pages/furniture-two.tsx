import HomeLayout from "@components/layout/home-layout";
import { addApolloState, initializeApollo } from "@utils/apollo";
import { getCategoriesInServer } from "@operations/category";
import { getProductsInServer } from "@operations/product";
import { GetStaticProps } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { scroller, Element } from "react-scroll";
import { useWindowSize } from "@utils/use-window-size";
import { sitePages, PageName } from "@settings/site-pages.settings";
import { getKeyValue } from "@utils/get-key-value";
import dynamic from "next/dynamic";
import BannerShort from "@components/common/banner-short";
import BoxCategory from "@components/category/box-category";
import FeedLayoutTwo from "@components/product/feed-layout-two";
import FilterBarLayoutTwo from "@components/common/filter-bar-layout-two";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { SettingsDocument } from "@graphql/settings.graphql";

const CartCounterButton = dynamic(
  () => import("@components/cart/cart-counter-button"),
  { ssr: false }
);
const PAGE_TYPE = "furniture";

export default function BakeryPage() {
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

BakeryPage.Layout = HomeLayout;

// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: SettingsDocument,
  });
  await apolloClient.query(getProductsInServer({ type: PAGE_TYPE, limit: 21 }));
  await apolloClient.query(getCategoriesInServer({ type: PAGE_TYPE }));
  return addApolloState(apolloClient, {
    props: {
      ...(await serverSideTranslations(locale!, ["common", "banner"])),
    },
    revalidate: 120,
  });
};
