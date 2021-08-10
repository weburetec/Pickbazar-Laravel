import NavbarWithSearch from "@components/layout/navbar/navbar-with-search";
import MobileNavigation from "./mobile-navigation";

const HomeLayout: React.FC = ({ children }) => (
  <div className="flex flex-col min-h-screen transition-colors duration-150">
    <NavbarWithSearch />
    {children}
    <MobileNavigation />
  </div>
);

export default HomeLayout;
