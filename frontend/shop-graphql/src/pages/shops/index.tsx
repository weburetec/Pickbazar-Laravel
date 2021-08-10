import { ShopsDocument, useShopsQuery } from "@graphql/shops.graphql";
import ShopCard from "@components/ui/shop-card";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import ShopPageLayout from "@components/layout/shop-layout";
import { GetStaticProps } from "next";
import { addApolloState, initializeApollo } from "@utils/apollo";
import { SettingsDocument } from "@graphql/settings.graphql";
import { TypesDocument } from "@graphql/types.graphql";

export default function ShopsPage() {
  const { t } = useTranslation("common");
  const { data } = useShopsQuery({
    variables: {
      is_active: true,
    },
  });

  return (
    <div className="bg-light min-h-screen ">
      <div className="w-full max-w-6xl mx-auto flex flex-col p-8 pt-32 md:pt-40">
        <div className="pt-12">
          <h3 className="text-2xl text-heading font-bold mb-8">
            {t("text-all-shops")}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Shop card */}
            {data?.shops?.data.map((shop) => (
              <ShopCard shop={shop} key={shop?.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

ShopsPage.Layout = ShopPageLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: SettingsDocument,
  });
  await apolloClient.query({
    query: TypesDocument,
  });
  await apolloClient.query({
    query: ShopsDocument,
    variables: {
      is_active: true,
    },
  });
  return addApolloState(apolloClient, {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  });
};
