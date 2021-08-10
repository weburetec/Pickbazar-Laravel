import Image from "next/image";
import ShopProductFeed from "@components/product/feed-shop";
import { useWindowSize } from "@utils/use-window-size";
import { ShopDocument, ShopsDocument } from "@graphql/shops.graphql";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import ShopProfileCard from "@components/profile/profile-card";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPathsContext, GetStaticProps } from "next";
import Layout from "@components/layout/layout";
import { addApolloState, initializeApollo } from "@utils/apollo";
import { SettingsDocument } from "@graphql/settings.graphql";
import { ProductsDocument } from "@graphql/products.graphql";

const CartCounterButton = dynamic(
  () => import("@components/cart/cart-counter-button"),
  { ssr: false }
);

export default function ShopPage({ data }: any) {
  const { width } = useWindowSize();
  const { t } = useTranslation("banner");

  return (
    <div className="bg-gray-100 flex flex-col md:flex-row md:items-start md:p-8">
      <ShopProfileCard data={data} className="sticky top-24 lg:top-28" />

      <div className="flex flex-col w-full p-4 md:p-0 md:ps-8">
        <div className="relative rounded w-full min-h-140 overflow-hidden hidden md:flex">
          <Image
            alt={t("heading")}
            src={
              data?.shop?.cover_image?.original! ?? "/product-placeholder.svg"
            }
            layout="fill"
            objectFit="cover"
          />
        </div>
        {data?.shop && <ShopProductFeed shopId={data?.shop.id!} />}
      </div>
      {width > 1023 && <CartCounterButton />}
    </div>
  );
}
// This function gets called at build time
export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: ShopsDocument,
    variables: {
      first: 100,
      is_active: true,
    },
  });
  const paths = data?.shops?.data?.flatMap((shop: any) =>
    locales?.map((locale) => ({ params: { slug: shop.slug }, locale }))
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
  const { data } = await apolloClient.query({
    query: ShopDocument,
    variables: {
      slug: params!.slug,
    },
  });
  await apolloClient.query({
    query: ProductsDocument,
    variables: {
      shop_id: Number(data?.shop?.id),
    },
  });
  if (!data?.shop) {
    return {
      notFound: true,
    };
  }
  return addApolloState(apolloClient, {
    props: {
      data,
      ...(await serverSideTranslations(locale!, ["common"])),
    },
    revalidate: 120,
  });
};

ShopPage.Layout = Layout;
