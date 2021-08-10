import SidebarWrapper from "@components/common/sidebar/sidebar-wrapper";
import BoxCategory from "./box-category";

export default function MobileCategoryBoxMenu() {
  return (
    <SidebarWrapper>
      <div className="h-full max-h-full overflow-hidden">
        <BoxCategory />
      </div>
    </SidebarWrapper>
  );
}
