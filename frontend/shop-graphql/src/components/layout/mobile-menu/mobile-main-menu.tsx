import { useUI } from "@contexts/ui.context";
import { siteSettings } from "@settings/site.settings";
import SidebarWrapper from "@components/common/sidebar/sidebar-wrapper";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";

export default function MobileMainMenu() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { closeSidebar, isAuthorize } = useUI();
  function handleClick(path: string) {
    router.push(path);
    return closeSidebar();
  }
  return (
    <SidebarWrapper>
      <ul className="flex-grow">
        {isAuthorize ? (
          <li key="track-orders">
            <span
              onClick={() => handleClick(ROUTES.ORDERS)}
              className="flex items-center py-3 px-5 md:px-8 text-sm font-semibold capitalize text-heading transition duration-200 hover:text-accent"
            >
              {t("nav-menu-track-order")}
            </span>
          </li>
        ) : null}
        {siteSettings.headerLinks.map(({ href, label, icon }) => (
          <li key={`${href}${label}`}>
            <span
              onClick={() => handleClick(href)}
              className="flex items-center py-3 px-5 md:px-8 text-sm font-semibold capitalize text-heading transition duration-200 hover:text-accent"
            >
              {icon && <span className="me-2">{icon}</span>}
              {t(label)}
            </span>
          </li>
        ))}
      </ul>
    </SidebarWrapper>
  );
}
