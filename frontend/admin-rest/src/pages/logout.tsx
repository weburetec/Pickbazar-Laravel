import { useEffect } from "react";
import { useRouter } from "next/router";
import Loader from "@components/ui/loader/loader";
import { useLogoutMutation } from "@data/user/use-logout.mutation";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function SignOut() {
  const router = useRouter();
  const { t } = useTranslation();
  const { mutate: logout } = useLogoutMutation();

  useEffect(() => {
    logout();
  }, [logout, router]);

  return <Loader text={t("common:signing-out-text")} />;
}

export default SignOut;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
