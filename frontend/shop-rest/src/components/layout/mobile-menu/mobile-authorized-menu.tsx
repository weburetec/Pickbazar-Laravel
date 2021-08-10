import { useUI } from "@contexts/ui.context";
import { siteSettings } from "@settings/site.settings";
import SidebarWrapper from "@components/common/sidebar/sidebar-wrapper";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export default function MobileAuthorizedMenu() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { closeSidebar } = useUI();
  function handleClick(path: string) {
    router.push(path);
    return closeSidebar();
  }
  return (
    <SidebarWrapper>
      <ul className="flex-grow">
        {siteSettings.authorizedLinks.map(({ href, label }) => (
          <li key={`${href}${label}`}>
            <span
              className="block py-3 px-5 md:px-8 text-sm font-semibold capitalize text-heading transition duration-200 hover:text-accent"
              onClick={() => handleClick(href)}
            >
              {t(label)}
            </span>
          </li>
        ))}
      </ul>
    </SidebarWrapper>
  );
}
