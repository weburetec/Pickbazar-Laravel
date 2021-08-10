import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { signOut as socialLoginSignOut } from "next-auth/client";
import { useApolloClient } from "@apollo/client";
import { useLogoutMutation } from "@graphql/auth.graphql";
import Spinner from "@components/ui/loaders/spinner/spinner";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function SignOut() {
  const { t } = useTranslation("common");
  const client = useApolloClient();
  const router = useRouter();
  const [signOut] = useLogoutMutation();

  useEffect(() => {
    socialLoginSignOut({ redirect: false });
    signOut().then(() => {
      client.resetStore().then(() => {
        Cookies.remove("auth_token");
        Cookies.remove("auth_permissions");
        router.push("/");
      });
    });
  }, [signOut, router, client]);

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="text-center">
        <Spinner text={t("text-signing-out")} />
      </div>
    </div>
  );
}

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
