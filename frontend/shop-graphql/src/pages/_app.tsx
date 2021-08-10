import { useEffect, useState } from "react";
import type { AppProps /*, AppContext */ } from "next/app";
import "@fontsource/open-sans";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@assets/main.css";
import "react-toastify/dist/ReactToastify.css";
import { ApolloProvider, useApolloClient } from "@apollo/client";
import { useApollo } from "@utils/apollo";
import { UIProvider, useUI } from "@contexts/ui.context";
import { SearchProvider } from "@contexts/search.context";
import { CheckoutProvider } from "@contexts/checkout.context";
import SidebarContainer from "@components/common/sidebar/sidebar-container";
import ErrorMessage from "@components/ui/error-message";
import { SettingsProvider } from "@contexts/settings.context";
import PageLoader from "@components/ui/page-loader/page-loader";
import { useSettingsQuery } from "@graphql/settings.graphql";
import { ToastContainer } from "react-toastify";
import { appWithTranslation } from "next-i18next";
import { CartProvider } from "@contexts/quick-cart/cart.context";
import DefaultSeo from "@components/ui/default-seo";
import { useSocialLoginMutation } from "@graphql/auth.graphql";
import { CUSTOMER } from "@utils/constants";
import Cookies from "js-cookie";
import ManagedModal from "@components/ui/modal/managed-modal";
import {
  ModalProvider,
  useModalAction,
} from "@components/ui/modal/modal.context";
import { Provider as NextAuthProvider, useSession } from "next-auth/client";

const Noop: React.FC = ({ children }) => <>{children}</>;

const AppSettings: React.FC = (props) => {
  const { data, loading, error } = useSettingsQuery();
  if (loading) return <PageLoader />;
  if (error) return <ErrorMessage message={error.message} />;
  return <SettingsProvider initialValue={data?.settings?.options} {...props} />;
};

const SocialLoginProvider: React.FC = () => {
  const [session, loading] = useSession();
  const client = useApolloClient();
  const { authorize, isAuthorize } = useUI();
  const { closeModal } = useModalAction();
  const [socialLogin] = useSocialLoginMutation({
    onCompleted: (data) => {
      if (data?.socialLogin?.token) {
        if (
          data?.socialLogin?.permissions?.length &&
          data?.socialLogin?.permissions.includes(CUSTOMER)
        ) {
          Cookies.set("auth_token", data?.socialLogin?.token);
          Cookies.set("auth_permissions", data?.socialLogin?.permissions);
          authorize();
          closeModal();
        } else {
          setErrorMsg("Doesn't have enough permission");
        }
      } else {
        setErrorMsg("The credentials was wrong!");
      }
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // is true when valid social login access token and provider is available in the session
    // but not authorize/logged in yet
    if (!isAuthorize && session?.accessToken && session?.provider) {
      client.resetStore();
      socialLogin({
        variables: {
          provider: session?.provider as string,
          accessToken: session?.accessToken as string,
        },
      });
    }
  }, [isAuthorize, session]);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  return <div>{errorMsg}</div>;
};

function CustomApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  const Layout = (Component as any).Layout || Noop;
  return (
    <ApolloProvider client={apolloClient}>
      <AppSettings>
        <ModalProvider>
          <CartProvider>
            <UIProvider>
              <NextAuthProvider>
                <CheckoutProvider>
                  <SearchProvider>
                    <Layout>
                      <DefaultSeo />
                      <Component {...pageProps} />
                    </Layout>
                    <ToastContainer autoClose={2000} />
                    <ManagedModal />
                    <SidebarContainer />
                  </SearchProvider>
                </CheckoutProvider>
                <SocialLoginProvider />
              </NextAuthProvider>
            </UIProvider>
          </CartProvider>
        </ModalProvider>
      </AppSettings>
    </ApolloProvider>
  );
}

export default appWithTranslation(CustomApp);
