import Navbar from "@components/layout/navbar/navbar";
import MobileNavigation from "./mobile-navigation";

const Layout: React.FC = ({ children }) => (
  <div className="min-h-screen flex flex-col transition-colors duration-150 bg-gray-100">
    <Navbar />
    <div className="flex-grow">{children}</div>
    <MobileNavigation search={false} />
  </div>
);

export default Layout;
