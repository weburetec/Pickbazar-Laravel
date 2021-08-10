import Image from "next/image";
import ShopProductFeed from "@components/product/feed-shop";
import { fetchShop } from "@data/shop/use-shop.query";
import { useTranslation } from "next-i18next";
import { useWindowSize } from "@utils/use-window-size";
import ShopProfileCard from "@components/profile/profile-card";
import dynamic from "next/dynamic";
import { GetStaticPathsContext, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "@components/layout/layout";
import { QueryClient } from "react-query";
import { fetchProducts } from "@data/product/use-products.query";
import { fetchSettings } from "@data/settings/use-settings.query";
import { dehydrate } from "react-query/hydration";

const CartCounterButton = dynamic(
  () => import("@components/cart/cart-counter-button"),
  { ssr: false }
);

const ShopPage = ({ data }: any) => {
  const { t } = useTranslation("common");
  const { width } = useWindowSize();

  return (
    <div className="bg-gray-100 flex flex-col md:flex-row md:items-start md:p-8">
      <ShopProfileCard data={data} className="sticky top-24 lg:top-28" />

      <div className="flex flex-col w-full p-4 md:p-0 md:ps-8">
        <div className="relative rounded w-full min-h-140 overflow-hidden hidden md:flex">
          <Image
            alt={t("heading")}
            src={data?.cover_image?.original! ?? "/product-placeholder.svg"}
            layout="fill"
            objectFit="cover"
          />
        </div>
        {data && <ShopProductFeed shopId={data.id} />}
      </div>
      {width > 1023 && <CartCounterButton />}
    </div>
  );
};
export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const { data } = await fetch(
    `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}all-shop?is_active=1`
  ).then((res) => res.json());
  const paths = data?.flatMap((shop: any) =>
    locales?.map((locale) => ({ params: { slug: shop.slug }, locale }))
  );

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: "blocking" };
}
// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("settings", fetchSettings);
  try {
    const shop = await fetchShop(params!.slug as string);
    await queryClient.prefetchInfiniteQuery(
      ["products", { shop_id: shop?.id }],
      fetchProducts
    );
    return {
      props: {
        data: shop,
        ...(await serverSideTranslations(locale!, ["common"])),
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
      revalidate: 120,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

ShopPage.Layout = Layout;
export default ShopPage;
