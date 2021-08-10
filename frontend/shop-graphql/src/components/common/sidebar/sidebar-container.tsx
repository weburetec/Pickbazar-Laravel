import dynamic from "next/dynamic";
import { useUI } from "@contexts/ui.context";
import Sidebar from "@components/common/sidebar/sidebar";
const CartSidebarView = dynamic(
  () => import("@components/cart/cart-sidebar-view")
);
const MobileCategoryMenu = dynamic(
  () => import("@components/layout/mobile-menu/mobile-category-menu")
);
const MobileCategoryBoxMenu = dynamic(
  () => import("@components/category/mobile-category-box-menu")
);
const MobileAuthorizedMenu = dynamic(
  () => import("@components/layout/mobile-menu/mobile-authorized-menu")
);
const MobileMainMenu = dynamic(
  () => import("@components/layout/mobile-menu/mobile-main-menu")
);

export default function SidebarContainer() {
  const { displaySidebar, closeSidebar, sidebarView } = useUI();
  return (
    <Sidebar
      open={displaySidebar}
      onClose={closeSidebar}
      variant={
        sidebarView === "FILTER_VIEW" ||
        sidebarView === "MAIN_MENU_VIEW" ||
        sidebarView === "FILTER_LAYOUT_TWO_VIEW"
          ? "left"
          : "right"
      }
      // useBlurBackdrop={true}
    >
      {sidebarView === "CART_VIEW" && <CartSidebarView />}
      {sidebarView === "FILTER_VIEW" && <MobileCategoryMenu />}
      {sidebarView === "FILTER_LAYOUT_TWO_VIEW" && <MobileCategoryBoxMenu />}
      {sidebarView === "MAIN_MENU_VIEW" && <MobileMainMenu />}
      {sidebarView === "AUTH_MENU_VIEW" && <MobileAuthorizedMenu />}
    </Sidebar>
  );
}
