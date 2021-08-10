import CategoryList from "@components/category/category-list";
import Card from "@components/common/card";
import Layout from "@components/layouts/admin";
import Search from "@components/common/search";
import LinkButton from "@components/ui/link-button";
import {
  useCategoriesQuery,
  QueryCategoriesOrderByColumn,
  SortOrder,
} from "@graphql/categories.graphql";
import { useState } from "react";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { adminOnly } from "@utils/auth-utils";
import { ROUTES } from "@utils/routes";
import SortFormGql from "@components/common/sort-form-gql";
import TypeFilter from "@components/category/type-filter";
import cn from "classnames";
import { ArrowDown } from "@components/icons/arrow-down";
import { ArrowUp } from "@components/icons/arrow-up";

export default function Categories() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible((v) => !v);
  };

  const { data, loading, error, refetch } = useCategoriesQuery({
    variables: {
      first: 10,
      orderBy: [
        {
          column: QueryCategoriesOrderByColumn.UpdatedAt,
          order: SortOrder.Desc,
        },
      ],
      page: 1,
    },
    fetchPolicy: "network-only",
  });

  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    refetch({
      text: `%${searchText}%`,
      page: 1,
    });
  }
  function handlePagination(current: any) {
    refetch({
      text: `%${searchTerm}%`,
      page: current,
    });
  }
  return (
    <>
      <Card className="flex flex-col mb-8">
        <div className="w-full flex flex-col md:flex-row items-center">
          <div className="md:w-1/4 mb-4 md:mb-0">
            <h1 className="text-xl font-semibold text-heading">
              {t("form:input-label-categories")}
            </h1>
          </div>

          <div className="w-full md:w-3/4 flex flex-col md:flex-row items-center">
            <div className="w-full flex items-center">
              <Search onSearch={handleSearch} />
              <LinkButton
                href={`${ROUTES.CATEGORIES}/create`}
                className="h-12 ms-4 md:ms-6"
              >
                <span className="hidden md:block">
                  + {t("form:button-label-add-categories")}
                </span>
                <span className="md:hidden">
                  + {t("form:button-label-add")}
                </span>
              </LinkButton>
            </div>

            <button
              className="text-accent text-base font-semibold flex items-center md:ms-5 mt-5 md:mt-0"
              onClick={toggleVisible}
            >
              {t("common:text-filter")}{" "}
              {visible ? (
                <ArrowUp className="ms-2" />
              ) : (
                <ArrowDown className="ms-2" />
              )}
            </button>
          </div>
        </div>

        <div
          className={cn("w-full flex transition", {
            "h-auto visible": visible,
            "h-0 invisible": !visible,
          })}
        >
          <div className="flex flex-col md:flex-row md:items-center mt-5 md:mt-8 border-t border-gray-200 pt-5 md:pt-8 w-full">
            <TypeFilter refetch={refetch} className="w-full md:w-1/2 md:mr-5" />

            <SortFormGql
              className="w-full md:w-1/2 mt-5 md:mt-0"
              refetch={refetch}
              options={Object.values(QueryCategoriesOrderByColumn).map(
                (value) => ({
                  label: value,
                  value: value,
                })
              )}
            />
          </div>
        </div>
      </Card>

      <CategoryList
        categories={data?.categories}
        onPagination={handlePagination}
      />
    </>
  );
}
Categories.authenticate = {
  permissions: adminOnly,
};
Categories.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common", "table"])),
  },
});
