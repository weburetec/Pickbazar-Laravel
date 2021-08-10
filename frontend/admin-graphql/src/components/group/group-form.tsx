import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import Button from "@components/ui/button";
import {
  useCreateTypeMutation,
  useUpdateTypeMutation,
  Type,
} from "@graphql/type.graphql";
import Description from "@components/ui/description";
import Card from "@components/common/card";
import { useRouter } from "next/router";
import { getErrorMessage } from "@utils/form-error";
import { getIcon } from "@utils/get-icon";
import Label from "@components/ui/label";

import * as typeIcons from "@components/icons/type";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";

import SelectInput from "@components/ui/select-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { groupValidationSchema } from "./group-validation-schema";
import { ROUTES } from "@utils/routes";
const typeIcon = [
  {
    value: "FruitsVegetable",
    label: "Fruits and Vegetable",
  },
  {
    value: "FacialCare",
    label: "Facial Care",
  },
  {
    value: "Handbag",
    label: "Hand Bag",
  },
  {
    value: "DressIcon",
    label: "Dress Icon",
  },
  {
    value: "FurnitureIcon",
    label: "Furniture Icon",
  },
  {
    value: "BookIcon",
    label: "Book Icon",
  },
  {
    value: "MedicineIcon",
    label: "Medicine Icon",
  },
  {
    value: "Restaurant",
    label: "Restaurant",
  },
  {
    value: "Bakery",
    label: "Bakery",
  },
];

export const updatedIcons = typeIcon.map((item: any) => {
  item.label = (
    <div className="flex space-s-5 items-center">
      <span className="flex w-5 h-5 items-center justify-center">
        {getIcon({
          iconList: typeIcons,
          iconName: item.value,
          className: "max-h-full max-w-full",
        })}
      </span>
      <span>{item.label}</span>
    </div>
  );
  return item;
});

type FormValues = {
  name?: string | null;
  icon?: any;
};

type IProps = {
  initialValues?: Type | null;
};
export default function CreateOrUpdateGroupForm({ initialValues }: IProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    register,
    control,
    handleSubmit,

    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(groupValidationSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      icon: initialValues?.icon
        ? typeIcon.find(
            (singleIcon) => singleIcon.value === initialValues?.icon!
          )
        : "",
    },
  });
  const [createType, { loading: creating }] = useCreateTypeMutation();
  const [updateType, { loading: updating }] = useUpdateTypeMutation();
  const onSubmit = async (values: FormValues) => {
    try {
      if (!initialValues) {
        await createType({
          variables: {
            input: { name: values.name!, icon: values.icon?.value },
          },
        });
        router.push(ROUTES.GROUPS);
      } else {
        const { data } = await updateType({
          variables: {
            id: initialValues.id!,
            input: { name: values.name!, icon: values.icon?.value },
          },
        });

        if (data) {
          toast.success(t("common:successfully-updated"));
        }
      }
    } catch (error) {
      getErrorMessage(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t("form:item-description")}
          details={`${
            initialValues
              ? t("form:item-description-update")
              : t("form:item-description-add")
          } ${t("form:group-description-help-text")}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t("form:input-label-name")}
            {...register("name")}
            error={t(errors.name?.message!)}
            variant="outline"
            className="mb-5"
          />

          <div className="mb-5">
            <Label>{t("form:input-label-select-icon")}</Label>
            <SelectInput
              name="icon"
              control={control}
              options={updatedIcons}
              isClearable={true}
            />
          </div>
        </Card>
      </div>

      <div className="mb-4 text-end">
        {initialValues && (
          <Button
            variant="outline"
            onClick={router.back}
            className="me-4"
            type="button"
          >
            {t("form:button-label-back")}
          </Button>
        )}

        <Button loading={creating || updating}>
          {initialValues
            ? t("form:button-label-update-group")
            : t("form:button-label-add-group")}
        </Button>
      </div>
    </form>
  );
}
