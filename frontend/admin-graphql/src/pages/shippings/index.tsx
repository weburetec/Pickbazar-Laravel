import Card from "@components/common/card";
import Layout from "@components/layouts/admin";
import ShippingList from "@components/shipping/shipping-list";
import Search from "@components/common/search";

import LinkButton from "@components/ui/link-button";
import {
  QueryShippingClassesOrderByColumn,
  SortOrder,
  useShippingClassesQuery,
} from "@graphql/shipping.graphql";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { adminOnly } from "@utils/auth-utils";
import { ROUTES } from "@utils/routes";
import SortFormGql from "@components/common/sort-form-gql";

export default function ShippingsPage() {
  const { t } = useTranslation();
  const { data, loading, error, refetch } = useShippingClassesQuery({
    variables: {
      orderBy: [
        {
          column: QueryShippingClassesOrderByColumn.UpdatedAt,
          order: SortOrder.Desc,
        },
      ],
    },
    fetchPolicy: "network-only",
  });
  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handleSearch({ searchText }: { searchText: string }) {
    refetch({
      text: `%${searchText}%`,
    });
  }
  return (
    <>
      <Card className="flex flex-col xl:flex-row items-center mb-8">
        <div className="md:w-1/4 mb-4 xl:mb-0">
          <h1 className="text-xl font-semibold text-heading">
            {t("form:input-label-shippings")}
          </h1>
        </div>

        <div className="w-full xl:w-3/4 flex flex-col md:flex-row space-y-4 md:space-y-0 items-center ms-auto">
          <Search onSearch={handleSearch} />

          <SortFormGql
            className="md:ms-5"
            showLabel={false}
            refetch={refetch}
            options={Object.values(QueryShippingClassesOrderByColumn).map(
              (value) => ({
                label: value,
                value: value,
              })
            )}
          />

          <LinkButton
            href={`${ROUTES.SHIPPINGS}/create`}
            className="h-12 md:ms-6 w-full md:w-auto"
          >
            <span className="block md:hidden xl:block">
              + {t("form:button-label-add")} {t("form:button-label-shipping")}
            </span>
            <span className="hidden md:block xl:hidden">
              + {t("form:button-label-add")}
            </span>
          </LinkButton>
        </div>
      </Card>
      <ShippingList shippings={data?.shippingClasses} />
    </>
  );
}
ShippingsPage.authenticate = {
  permissions: adminOnly,
};
ShippingsPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});
