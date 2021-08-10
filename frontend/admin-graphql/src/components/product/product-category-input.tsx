import SelectInput from "@components/ui/select-input";
import Label from "@components/ui/label";
import { Control, useFormState, useWatch } from "react-hook-form";
import {
  useCategoriesAlongChildrenQuery,
  QueryCategoriesAlongChildrenHasTypeColumn,
  SqlOperator,
} from "@graphql/categories.graphql";
import { useEffect } from "react";
import { useTranslation } from "next-i18next";

interface Props {
  control: Control<any>;
  setValue: any;
}

const ProductCategoryInput = ({ control, setValue }: Props) => {
  const { t } = useTranslation();
  const type = useWatch({
    control,
    name: "type",
  });
  const { dirtyFields } = useFormState({
    control,
  });
  useEffect(() => {
    if (type?.slug && dirtyFields?.type) {
      setValue("categories", []);
    }
  }, [type?.slug]);

  const { data, loading } = useCategoriesAlongChildrenQuery({
    fetchPolicy: "network-only",
    variables: {
      ...(type && {
        hasType: {
          column: QueryCategoriesAlongChildrenHasTypeColumn.Slug,
          operator: SqlOperator.Eq,
          value: type?.slug,
        },
      }),
    },
  });
  return (
    <div className="mb-5">
      <Label>{t("form:input-label-categories")}</Label>
      <SelectInput
        name="categories"
        isMulti
        control={control}
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.id}
        // @ts-ignore
        options={data?.categoriesAlongChildren}
        isLoading={loading}
      />
    </div>
  );
};

export default ProductCategoryInput;
