import { GetStaticPathsContext, GetStaticProps } from "next";
import ProductDetails from "@components/product/product-details";
import Layout from "@components/layout/layout";
import { getProductInServer } from "@operations/product";
import { ProductsDocument } from "@graphql/products.graphql";
import { addApolloState, initializeApollo } from "@utils/apollo";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import RelatedProducts from "@components/product/product-details/related-products";
import { SettingsDocument } from "@graphql/settings.graphql";

const CartCounterButton = dynamic(
  () => import("@components/cart/cart-counter-button"),
  { ssr: false }
);

// This function gets called at build time
export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: ProductsDocument,
    variables: {
      first: 100,
    },
  });
  const paths = data?.products?.data?.flatMap((product: any) =>
    locales?.map((locale) => ({ params: { slug: product.slug }, locale }))
  );
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: "blocking" };
}
// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const apolloClient = initializeApollo();
  const { slug } = params as any;
  await apolloClient.query({
    query: SettingsDocument,
  });
  const {
    data: { product },
  } = await apolloClient.query(getProductInServer({ slug }));

  if (!product) {
    return {
      notFound: true,
    };
  }
  return addApolloState(apolloClient, {
    props: {
      product,
      ...(await serverSideTranslations(locale!, ["common"])),
    },
    revalidate: 60,
  });
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
