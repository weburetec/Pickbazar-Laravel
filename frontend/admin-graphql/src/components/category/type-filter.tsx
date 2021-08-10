import Select from "@components/ui/select/select";
import { QueryCategoriesHasTypeColumn } from "@graphql/products.graphql";
import React from "react";
import { useTypesQuery } from "@graphql/type.graphql";
import { useTranslation } from "next-i18next";
import Label from "@components/ui/label";
import cn from "classnames";

type Props = {
  refetch: Function;
  className?: string;
};

export default function TypeFilter({ refetch, className }: Props) {
  const { t } = useTranslation();

  const { data, loading } = useTypesQuery({
    fetchPolicy: "network-only",
  });

  return (
    <div className={cn("flex w-full", className)}>
      <div className="w-full">
        <Label>{t("common:filter-by-group")}</Label>
        <Select
          options={data?.types}
          isLoading={loading}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.slug}
          placeholder={t("common:filter-by-group-placeholder")}
          onChange={({ slug }: { slug: string }) => {
            refetch({
              page: 1,
              hasType: {
                column: QueryCategoriesHasTypeColumn.Slug,
                value: slug,
              },
            });
          }}
        />
      </div>
    </div>
  );
}
