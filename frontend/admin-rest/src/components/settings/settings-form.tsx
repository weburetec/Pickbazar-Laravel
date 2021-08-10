import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import Button from "@components/ui/button";
import { SettingsOptions, Shipping, Tax } from "@ts-types/generated";
import Description from "@components/ui/description";
import Card from "@components/common/card";
import Label from "@components/ui/label";
import { CURRENCY } from "./currency";
import { siteSettings } from "@settings/site.settings";
import ValidationError from "@components/ui/form-validation-error";
import { useUpdateSettingsMutation } from "@data/settings/use-settings-update.mutation";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { settingsValidationSchema } from "./settings-validation-schema";
import FileInput from "@components/ui/file-input";
import SelectInput from "@components/ui/select-input";
import TextArea from "@components/ui/text-area";
import { getFormattedImage } from "@utils/get-formatted-image";

type FormValues = {
  siteTitle: string;
  siteSubtitle: string;
  currency: any;
  logo: any;
  taxClass: Tax;
  shippingClass: Shipping;
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: any;
    twitterHandle: string;
    twitterCardType: string;
    metaTags: string;
    canonicalUrl: string;
  };
  google: {
    isEnable: boolean;
    tagManagerId: string;
  };
  facebook: {
    isEnable: boolean;
    appId: string;
    pageId: string;
  };
};

type IProps = {
  settings?: SettingsOptions | undefined | null;
  taxClasses: Tax[] | undefined | null;
  shippingClasses: Shipping[] | undefined | null;
};

export default function SettingsForm({
  settings,
  taxClasses,
  shippingClasses,
}: IProps) {
  const { t } = useTranslation();
  const { mutate: updateSettingsMutation, isLoading: loading } =
    useUpdateSettingsMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    shouldUnregister: true,
    resolver: yupResolver(settingsValidationSchema),
    defaultValues: {
      ...settings,
      logo: settings?.logo ?? "",
      currency: settings?.currency
        ? CURRENCY.find((item) => item.code == settings?.currency)
        : "",
      // @ts-ignore
      taxClass: !!taxClasses?.length
        ? taxClasses?.find((tax: Tax) => tax.id == settings?.taxClass)
        : "",
      // @ts-ignore
      shippingClass: !!shippingClasses?.length
        ? shippingClasses?.find(
            (shipping: Shipping) => shipping.id == settings?.shippingClass
          )
        : "",
    },
  });

  async function onSubmit(values: FormValues) {
    updateSettingsMutation({
      variables: {
        input: {
          options: {
            ...values,
            currency: values.currency?.code,
            taxClass: values?.taxClass?.id,
            shippingClass: values?.shippingClass?.id,
            logo: values?.logo,
            //@ts-ignore
            seo: {
              ...values?.seo,
              ogImage: getFormattedImage(values?.seo?.ogImage),
            },
          },
        },
      },
    });
  }

  const logoInformation = (
    <span>
      {t("form:logo-help-text")} <br />
      {t("form:logo-dimension-help-text")} &nbsp;
      <span className="font-bold">
        {siteSettings.logo.width}x{siteSettings.logo.height} {t("common:pixel")}
      </span>
    </span>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        <Description
          title={t("form:input-label-logo")}
          details={logoInformation}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput name="logo" control={control} multiple={false} />
        </Card>
      </div>

      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t("form:form-title-information")}
          details={t("form:site-info-help-text")}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t("form:input-label-site-title")}
            {...register("siteTitle")}
            error={t(errors.siteTitle?.message!)}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t("form:input-label-site-subtitle")}
            {...register("siteSubtitle")}
            error={t(errors.siteSubtitle?.message!)}
            variant="outline"
            className="mb-5"
          />

          <div className="mb-5">
            <Label>{t("form:input-label-currency")}</Label>
            <SelectInput
              name="currency"
              control={control}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.code}
              options={CURRENCY}
            />
            <ValidationError message={t(errors.currency?.message)} />
          </div>

          <div className="mb-5">
            <Label>{t("form:input-label-tax-class")}</Label>
            <SelectInput
              name="taxClass"
              control={control}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.id}
              options={taxClasses!}
            />
          </div>

          <div>
            <Label>{t("form:input-label-shipping-class")}</Label>
            <SelectInput
              name="shippingClass"
              control={control}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.id}
              options={shippingClasses!}
            />
          </div>
        </Card>
      </div>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title="SEO"
          details={t("form:tax-form-seo-info-help-text")}
          className="w-full px-0 sm:pr-4 md:pr-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t("form:input-label-meta-title")}
            {...register("seo.metaTitle")}
            variant="outline"
            className="mb-5"
          />
          <TextArea
            label={t("form:input-label-meta-description")}
            {...register("seo.metaDescription")}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t("form:input-label-meta-tags")}
            {...register("seo.metaTags")}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t("form:input-label-canonical-url")}
            {...register("seo.canonicalUrl")}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t("form:input-label-og-title")}
            {...register("seo.ogTitle")}
            variant="outline"
            className="mb-5"
          />
          <TextArea
            label={t("form:input-label-og-description")}
            {...register("seo.ogDescription")}
            variant="outline"
            className="mb-5"
          />
          <div className="mb-5">
            <Label>{t("form:input-label-og-image")}</Label>
            <FileInput name="seo.ogImage" control={control} multiple={false} />
          </div>
          <Input
            label={t("form:input-label-twitter-handle")}
            {...register("seo.twitterHandle")}
            variant="outline"
            className="mb-5"
            placeholder="your twitter username (exp: @username)"
          />
          <Input
            label={t("form:input-label-twitter-card-type")}
            {...register("seo.twitterCardType")}
            variant="outline"
            className="mb-5"
            placeholder="one of summary, summary_large_image, app, or player"
          />
        </Card>
      </div>

      <div className="mb-4 text-end">
        <Button loading={loading} disabled={loading}>
          {t("form:button-label-save-settings")}
        </Button>
      </div>
    </form>
  );
}
