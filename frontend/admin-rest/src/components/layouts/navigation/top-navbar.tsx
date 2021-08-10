import Logo from "@components/ui/logo";
import { useUI } from "@contexts/ui.context";
import AuthorizedMenu from "./authorized-menu";
import Drawer from "@components/ui/drawer";
import LinkButton from "@components/ui/link-button";
import { NavbarIcon } from "@components/icons/navbar-icon";
import { motion } from "framer-motion";
import DrawerWrapper from "@components/ui/drawer-wrapper";
import { siteSettings } from "@settings/site.settings";
import { useTranslation } from "next-i18next";
import { ROUTES } from "@utils/routes";
import {
  adminAndOwnerOnly,
  getAuthCredentials,
  hasAccess,
} from "@utils/auth-utils";
import SidebarItem from "./sidebar-item";

const Navbar = () => {
  const { t } = useTranslation();
  const { toggleSidebar, displaySidebar, closeSidebar } = useUI();

  const { permissions } = getAuthCredentials();

  return (
    <header className="bg-white shadow fixed w-full z-40">
      <nav className="px-5 md:px-8 py-4 flex items-center justify-between">
        {/* <!-- Mobile menu button --> */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={toggleSidebar}
          className="flex p-2 h-full items-center justify-center focus:outline-none focus:text-primary lg:hidden"
        >
          <NavbarIcon />
        </motion.button>

        <div className="hidden md:flex ms-5 me-auto">
          <Logo />
        </div>

        <Drawer open={displaySidebar} onClose={closeSidebar} variant="left">
          <DrawerWrapper onClose={closeSidebar}>
            <div className="flex flex-col space-y-6 p-5">
              {siteSettings.sidebarLinks.admin.map(({ href, label, icon }) => (
                <SidebarItem
                  href={href}
                  label={t(label)}
                  icon={icon}
                  key={href}
                />
              ))}
            </div>
          </DrawerWrapper>
        </Drawer>

        <div className="flex items-center space-s-8">
          {hasAccess(adminAndOwnerOnly, permissions) && (
            <LinkButton
              href={ROUTES.CREATE_SHOP}
              className="ms-4 md:ms-6"
              size="small"
            >
              {t("common:text-create-shop")}
            </LinkButton>
          )}

          <AuthorizedMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
