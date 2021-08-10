import { useRef } from "react";
import Link from "@components/ui/link";
import cn from "classnames";
import { useUI } from "@contexts/ui.context";
import { siteSettings } from "@settings/site.settings";
import Logo from "@components/ui/logo";
import JoinButton from "@components/layout/navbar/join-button";
import * as typeIcon from "@components/icons/type";
import dynamic from "next/dynamic";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { useTypesQuery } from "@graphql/types.graphql";
import { useTranslation } from "next-i18next";
import { getIcon } from "@utils/get-icon";
import { Waypoint } from "react-waypoint";

const AuthorizedMenu = dynamic(
  () => import("@components/layout/navbar/authorized-menu"),
  { ssr: false }
);
type DivElementRef = React.MutableRefObject<HTMLDivElement>;

const NavbarWithTypes: React.FC = () => {
  const { t } = useTranslation("common");

  const { showHeaderSearch, hideHeaderSearch } = useUI();

  const onWaypointPositionChange = ({
    currentPosition,
  }: Waypoint.CallbackArgs) => {
    if (!currentPosition || currentPosition === "above") {
      showHeaderSearch();
    }
  };

  const router = useRouter();
  const { data } = useTypesQuery();

  function handleClick(path: string) {
    close();
    router.push(path);
  }

  const selectedMenu = data?.types?.find((type: any) =>
    router.asPath.includes(type.slug)
  );

  const slugs = data?.types?.map((item) => item.slug);
  const currentPath = router.asPath
    .substring(
      0,
      router.asPath.indexOf("?") === -1
        ? router.asPath.length
        : router.asPath.indexOf("?")
    )
    .replace(/\//g, "");

  const hasType = slugs?.includes(currentPath);

  const navbarRef = useRef() as DivElementRef;
  const { isAuthorize, displayHeaderSearch, displayMobileSearch } = useUI();

  return (
    <>
      <Waypoint
        onLeave={showHeaderSearch}
        onEnter={hideHeaderSearch}
        onPositionChange={onWaypointPositionChange}
      />
      <header
        ref={navbarRef}
        className={cn(
          "site-header-with-search w-full top-0 end-0 z-20 border-b border-gray-200 transition-shadow duration-300 bg-light",
          {
            "fixed lg:absolute": !displayHeaderSearch,
            "is-sticky fixed bg-light shadow-md": displayHeaderSearch,
          }
        )}
      >
        <nav
          className={cn(
            "w-full h-14 md:h-16 lg:h-22 py-5 px-4 lg:px-8 flex justify-between items-center border-b border-gray-100 "
          )}
        >
          <Logo className="mx-auto lg:mx-0" />

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
        </nav>

        <div className="flex items-center mx-auto w-full max-w-6xl space-x-6 h-20 md:h-24 px-5 overflow-x-auto">
          {data?.types?.map(({ id, name, slug, icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => handleClick(`/${slug}`)}
              className={cn(
                "flex items-center flex-shrink-0 bg-gray-100 text-sm font-semibold px-6 h-12 rounded-3xl border border-gray-200 text-heading focus:outline-none",
                {
                  "!border-gray-900": selectedMenu,
                }
              )}
            >
              {icon && (
                <span className="flex w-5 h-5 items-center justify-center">
                  {getIcon({
                    iconList: typeIcon,
                    iconName: icon,
                    className: "max-h-full max-w-full",
                  })}
                </span>
              )}
              <span className="ms-2">{name}</span>
            </button>
          ))}
        </div>
      </header>
    </>
  );
};

export default NavbarWithTypes;
