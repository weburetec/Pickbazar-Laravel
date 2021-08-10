import { useRef } from "react";
import Link from "@components/ui/link";
import cn from "classnames";
import { useUI } from "@contexts/ui.context";
import { siteSettings } from "@settings/site.settings";
import Logo from "@components/ui/logo";
import Search from "@components/common/search";
import JoinButton from "@components/layout/navbar/join-button";
import ProductTypeMenu from "@components/layout/navbar/product-type-menu";
import dynamic from "next/dynamic";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { useTypesQuery } from "@graphql/types.graphql";
import { useTranslation } from "next-i18next";

const AuthorizedMenu = dynamic(
  () => import("@components/layout/navbar/authorized-menu"),
  { ssr: false }
);
type DivElementRef = React.MutableRefObject<HTMLDivElement>;

type Props = {
  hideTypeMenu?: boolean;
};

const NavbarWithSearch: React.FC<Props> = ({ hideTypeMenu = false }) => {
  const { t } = useTranslation("common");
  const { asPath } = useRouter();
  const { data } = useTypesQuery();

  const slugs = data?.types?.map((item) => item.slug);
  const currentPath = asPath
    .substring(
      0,
      asPath.indexOf("?") === -1 ? asPath.length : asPath.indexOf("?")
    )
    .replace(/\//g, "");

  const hasType = slugs?.includes(currentPath);

  const navbarRef = useRef() as DivElementRef;
  const { isAuthorize, displayHeaderSearch, displayMobileSearch } = useUI();

  return (
    <header
      ref={navbarRef}
      className="site-header-with-search h-14 md:h-16 lg:h-auto"
    >
      <nav
        className={cn(
          "w-full h-14 md:h-16 lg:h-22 py-5 px-4 lg:px-8 flex justify-between items-center  top-0 end-0 z-20 transition-transform duration-300",
          {
            "fixed bg-light lg:bg-transparent lg:absolute":
              !displayHeaderSearch && hasType,
            "is-sticky fixed bg-light shadow-sm":
              displayHeaderSearch || !hasType,
          }
        )}
      >
        {displayMobileSearch ? (
          <div className="w-full">
            <Search label={t("text-search-label")} variant="minimal" />
          </div>
        ) : (
          <>
            <Logo className="mx-auto lg:mx-0" />
            {!hideTypeMenu && (
              <ProductTypeMenu className="ms-10 me-auto hidden xl:block" />
            )}
            <div className="hidden lg:block w-full">
              <div
                className={cn(
                  "w-full xl:w-11/12 2xl:w-10/12 mx-auto px-10 overflow-hidden",
                  {
                    hidden: !displayHeaderSearch && hasType,
                    flex: displayHeaderSearch || !hasType,
                  }
                )}
              >
                <Search label={t("text-search-label")} variant="minimal" />
              </div>
            </div>
            <ul className="hidden lg:flex items-center flex-shrink-0 space-s-10">
              {isAuthorize ? (
                <li key="track-orders">
                  <Link
                    href={ROUTES.ORDERS}
                    className="font-semibold text-heading flex items-center transition duration-200 no-underline hover:text-accent focus:text-accent"
                  >
                    {t("nav-menu-track-order")}
                  </Link>
                </li>
              ) : null}
              {siteSettings.headerLinks.map(({ href, icon, label }) => (
                <li key={`${href}${label}`}>
                  <Link
                    href={href}
                    className="font-semibold text-heading flex items-center transition duration-200 no-underline hover:text-accent focus:text-accent"
                  >
                    {icon && <span className="me-2">{icon}</span>}
                    {t(label)}
                  </Link>
                </li>
              ))}
              {isAuthorize ? (
                <li>
                  <AuthorizedMenu />
                </li>
              ) : (
                <li>
                  <JoinButton />
                </li>
              )}
            </ul>
          </>
        )}
      </nav>
    </header>
  );
};

export default NavbarWithSearch;
