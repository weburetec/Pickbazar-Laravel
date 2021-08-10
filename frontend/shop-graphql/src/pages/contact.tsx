import Input from "@components/ui/input";
import Layout from "@components/layout/layout";
import { useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import Button from "@components/ui/button";
import { useContactMutation } from "@graphql/contact.graphql";
import { toast } from "react-toastify";
import { siteSettings } from "@settings/site.settings";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const contactFormSchema = yup.object().shape({
  name: yup.string().required("error-name-required"),
  email: yup
    .string()
    .email("error-email-format")
    .required("error-email-required"),
  subject: yup.string().required("error-subject-required"),
  description: yup.string().required("error-description-required"),
});

export const ContactPage = () => {
  const { t } = useTranslation("common");
  const [mutate, { loading }] = useContactMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(contactFormSchema) });
  async function onSubmit(values: any) {
    const { data } = await mutate({
      variables: {
        input: values,
      },
    });
    if (data?.contact?.success) {
      toast.success(t(data.contact.message!));
      reset();
    } else {
      toast.error(t(data?.contact?.message!));
    }
  }
  return (
    <div className="w-full bg-gray-100">
      <div className="flex flex-col md:flex-row max-w-7xl w-full mx-auto py-10 px-5 xl:py-14 xl:px-8 2xl:px-14">
        {/* sidebar */}
        <div className="w-full md:w-72 lg:w-96 bg-light p-5 flex-shrink-0 order-2 md:order-1">
          <div className="w-full flex items-center justify-center overflow-hidden mb-8">
            <img
              src="/contact-illustration.svg"
              alt={t("nav-menu-contact")}
              className="w-full h-auto"
            />
          </div>

          <div className="flex flex-col mb-8">
            <span className="font-semibold text-heading mb-3">
              {t("text-address")}
            </span>
            <span className="text-sm text-body">
              {siteSettings.author.address}
            </span>
          </div>

          <div className="flex flex-col mb-8">
            <span className="font-semibold text-heading mb-3">
              {t("text-phone")}
            </span>
            <span className="text-sm text-body">
              {siteSettings.author.phone}
            </span>
          </div>

          <div className="flex flex-col mb-8">
            <span className="font-semibold text-heading mb-3">
              {t("text-website")}
            </span>
            <div className="flex items-center justify-between">
              <span className="text-sm text-body">
                {siteSettings.author.websiteUrl}
              </span>
              <a
                href={siteSettings.author.websiteUrl}
                target="_blank"
                className="text-sm text-accent font-semibold hover:text-accent-hover focus:outline-none focus:text-blue-500"
              >
                {t("text-visit-site")}
              </a>
            </div>
          </div>

          <div className="flex flex-col mb-8">
            <span className="font-semibold text-heading mb-4">
              {t("text-follow-us")}
            </span>
            <div className="flex items-center justify-start">
              {siteSettings.author.social.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  className={`text-muted focus:outline-none me-8 last:me-0 transition-colors duration-300 hover:${item.hoverClass}`}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="w-full order-1 md:order-2 mb-8 md:mb-0 md:ms-7 lg:ms-9 p-5 md:p-8 bg-light">
          <h1 className="mb-7 text-xl md:text-2xl font-body font-bold text-heading">
            {t("text-questions-comments")}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label={t("text-name")}
                {...register("name")}
                variant="outline"
                error={t(errors.name?.message!)}
              />
              <Input
                label={t("text-email")}
                {...register("email")}
                type="email"
                variant="outline"
                error={t(errors.email?.message!)}
              />
            </div>
            <Input
              label={t("text-subject")}
              {...register("subject")}
              variant="outline"
              className="my-6"
              error={t(errors.subject?.message!)}
            />
            <TextArea
              label={t("text-description")}
              {...register("description")}
              variant="outline"
              className="my-6"
              error={t(errors.description?.message!)}
            />

            <Button loading={loading} disabled={loading}>
              {t("text-submit")}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
ContactPage.Layout = Layout;
export default ContactPage;

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
