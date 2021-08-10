import Card from "@components/common/card";
import Layout from "@components/layouts/admin";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useWithdrawsQuery } from "@graphql/withdraws.graphql";
import WithdrawList from "@components/withdraw/withdraw-list";
import { adminOnly } from "@utils/auth-utils";
import SortForm from "@components/common/sort-form";

export default function WithdrawsPage() {
  const { t } = useTranslation();
  const { data, loading, error, refetch } = useWithdrawsQuery({
    variables: {
      first: 10,
      page: 1,
    },
    fetchPolicy: "network-only",
  });

  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handlePagination(current: any) {
    refetch({
      page: current,
    });
  }
  return (
    <>
      <Card className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h1 className="text-lg font-semibold text-heading">
            {t("common:sidebar-nav-item-withdraws")}
          </h1>
        </div>

        <SortForm
          showLabel={false}
          className="w-full md:w-2/4"
          refetch={refetch}
          options={[
            {
              label: "Amount",
              value: "amount",
            },
            {
              label: "Create At",
              value: "created_at",
            },
            {
              label: "Updated At",
              value: "updated_at",
            },
          ]}
        />
      </Card>
      <WithdrawList
        withdraws={data?.withdraws}
        onPagination={handlePagination}
      />
    </>
  );
}
WithdrawsPage.authenticate = {
  permissions: adminOnly,
};
WithdrawsPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});
