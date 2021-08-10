import { useEffect } from "react";
import { useRouter } from "next/router";
import * as gtm from "@utils/gtm";

const GoogleTagManager: React.FC = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", gtm.pageview);
    return () => {
      router.events.off("routeChangeComplete", gtm.pageview);
    };
  }, [router.events]);

  return <>{children}</>;
};

export default GoogleTagManager;
