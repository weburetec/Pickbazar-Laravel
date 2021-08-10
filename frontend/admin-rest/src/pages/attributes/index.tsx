import Card from "@components/common/card";
import Layout from "@components/layouts/admin";
import AttributeList from "@components/attribute/attribute-list";
import ErrorMessage from "@components/ui/error-message";
import LinkButton from "@components/ui/link-button";
import Loader from "@components/ui/loader/loader";
import { useAttributesQuery } from "@data/attributes/use-attributes.query";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ROUTES } from "@utils/routes";
import SortForm from "@components/common/sort-form";
import { SortOrder } from "@ts-types/generated";
import { useState } from "react";

export default function AttributePage() {
  const { t } = useTranslation();
  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const {
    data,
    isLoading: loading,
    error,
  } = useAttributesQuery({ orderBy, sortedBy });
  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <Card className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h1 className="text-xl font-semibold text-heading">
            {t("common:sidebar-nav-item-attributes")}
          </h1>
        </div>

        {/* <div className="flex items-center ms-auto"> */}
        {/* <LinkButton
            href={`${ROUTES.ATTRIBUTES}/create`}
            className="h-12 ms-4 md:ms-6"
          >
            <span className="hidden md:block">
              + {t("form:button-label-add")} {t("common:attribute")}
            </span>
            <span className="md:hidden">+ {t("form:button-label-add")}</span>
          </LinkButton> */}
        <SortForm
          showLabel={false}
          className="w-full md:w-2/4"
          onSortChange={({ value }: { value: SortOrder }) => {
            setColumn(value);
          }}
          onOrderChange={({ value }: { value: string }) => {
            setOrder(value);
          }}
          options={[
            { id: 1, value: "name", label: "Name" },
            { id: 2, value: "created_at", label: "Created At" },
            { id: 2, value: "updated_at", label: "Updated At" },
          ]}
        />
        {/* </div> */}
      </Card>
      <AttributeList attributes={data?.attributes as any} />
    </>
  );
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});

AttributePage.Layout = Layout;
