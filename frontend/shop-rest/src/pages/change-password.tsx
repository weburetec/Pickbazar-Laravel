import Layout from "@components/layout/layout";
import { useForm } from "react-hook-form";
import Button from "@components/ui/button";
import { toast } from "react-toastify";
import { GetServerSideProps } from "next";
import { yupResolver } from "@hookform/resolvers/yup";

import ProfileSidebar from "@components/profile/profile-sidebar";
import Card from "@components/ui/card";
import { parseContextCookie } from "@utils/parse-cookie";
import PasswordInput from "@components/ui/password-input";
import { useChangePasswordMutation } from "@data/auth/use-change-password.mutation";
import * as yup from "yup";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  locale,
}: any) => {
  const cookies = parseContextCookie(req?.headers?.cookie);
  if (!cookies?.auth_token) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

interface FormValues {
  oldPassword: string;
  newPassword: string;
  passwordConfirmation: string;
}

const changeSchema = yup.object().shape({
  oldPassword: yup.string().required("error-old-password-required"),
  newPassword: yup.string().required("error-new-password-required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("newPassword")], "error-match-passwords")
    .required("error-confirm-password"),
});

const ChangePasswordPage = () => {
  const { t } = useTranslation("common");

  const { mutate: changePassword, isLoading: loading } =
    useChangePasswordMutation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(changeSchema),
  });
  function onSubmit(values: FormValues) {
    changePassword(
      {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      },
      {
        onSuccess: (data) => {
          if (!data.success) {
            setError("oldPassword", {
              type: "manual",
              message: data.message,
            });
            return;
          }
          toast.success(t("password-successful"));
        },
        onError: (error) => {
          const {
            response: { data },
          }: any = error ?? {};
          Object.keys(data).forEach((field: any) => {
            setError(field, {
              type: "manual",
              message: data[field][0],
            });
          });
        },
      }
    );
  }
  return (
    <div className="flex flex-col xl:flex-row items-start max-w-1920 w-full mx-auto py-10 px-8 xl:py-14 xl:px-16 2xl:px-20 bg-gray-100">
      <ProfileSidebar className="flex-shrink-0 hidden xl:block xl:w-80 me-10" />
      {/* End of sidebar navigation */}
      <Card className="w-full">
        <h1 className="mb-5 sm:mb-8 text-lg sm:text-xl text-heading font-semibold">
          {t("change-password")}
        </h1>

        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col"
        >
          <PasswordInput
            label={t("text-old-password")}
            {...register("oldPassword")}
            error={t(errors.oldPassword?.message!)}
            className="mb-5"
            variant="outline"
          />
          <PasswordInput
            label={t("text-new-password")}
            {...register("newPassword")}
            error={t(errors.newPassword?.message!)}
            className="mb-5"
            variant="outline"
          />
          <PasswordInput
            label={t("text-confirm-password")}
            {...register("passwordConfirmation")}
            error={t(errors.passwordConfirmation?.message!)}
            className="mb-5"
            variant="outline"
          />
          <Button loading={loading} disabled={loading} className="ms-auto">
            {t("text-submit")}
          </Button>
        </form>
      </Card>
    </div>
  );
};
ChangePasswordPage.Layout = Layout;
export default ChangePasswordPage;
