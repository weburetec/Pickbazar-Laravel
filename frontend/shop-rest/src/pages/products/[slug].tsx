import { GetStaticPathsContext, GetStaticProps } from "next";
import ProductDetails from "@components/product/product-details";
import Layout from "@components/layout/layout";
import { fetchProducts } from "@data/product/use-products.query";
import { fetchProduct } from "@data/product/use-product.query";
import { Product } from "@ts-types/custom.types";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import RelatedProducts from "@components/product/product-details/related-products";
import { QueryClient } from "react-query";
import { fetchSettings } from "@data/settings/use-settings.query";
import { dehydrate } from "react-query/hydration";
const CartCounterButton = dynamic(
  () => import("@components/cart/cart-counter-button"),
  { ssr: false }
);

// This function gets called at build time
export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const products = await fetchProducts({
    queryKey: ["products", { limit: 100 }],
  });
  const paths = products?.data?.flatMap((product: Product) =>
    locales?.map((locale) => ({ params: { slug: product.slug }, locale }))
  );
  return {
    paths,
    fallback: "blocking",
  };
}
export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug as string;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("settings", fetchSettings);
  try {
    const product = await fetchProduct(slug);
    return {
      props: {
        product,
        ...(await serverSideTranslations(locale!, ["common"])),
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default function ProductSinglePage({ product }: any) {
  return (
    <>
      <div className="bg-light min-h-screen">
        <ProductDetails product={product} />

        {product?.related_products?.length > 1 && (
          <div className="p-5 lg:p-14 xl:p-16">
            <RelatedProducts
              products={product?.related_products}
              currentProductId={product?.id}
              gridClassName="lg:grid-cols-4 2xl:grid-cols-5 !gap-3"
            />
          </div>
        )}
      </div>

      <CartCounterButton />
    </>
  );
}
ProductSinglePage.Layout = Layout;
