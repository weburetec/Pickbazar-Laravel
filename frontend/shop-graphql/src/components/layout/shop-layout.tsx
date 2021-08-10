import MobileNavigation from "./mobile-navigation";
import NavbarWithTypes from "./navbar/navbar-with-types";

const ShopLayout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col transition-colors duration-150">
      <NavbarWithTypes />
      {children}
      <MobileNavigation />
    </div>
  );
};

export default ShopLayout;
