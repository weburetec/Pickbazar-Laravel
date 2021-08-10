import cn from "classnames";
import NavLink from "@components/ui/link/nav-link";
import { siteSettings } from "@settings/site.settings";
import { useTranslation } from "next-i18next";

type DashboardSidebarProps = {
  className?: string;
};

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ className }) => {
  const { t } = useTranslation();
  return (
    <aside
      className={cn(
        "bg-light rounded border border-border-200 overflow-hidden",
        className
      )}
    >
      <ul className="py-8">
        {siteSettings.dashboardSidebarMenu
          ?.slice(0, -1)
          .map((item: any, idx) => (
            <li className="py-2" key={idx}>
              <NavLink
                href={item.href}
                activeClassName="border-accent text-accent"
              >
                <a className="block py-2 px-10 font-semibold text-heading transition-colors border-l-4 border-transparent hover:text-accent focus:text-accent">
                  {t(item.menulabel)}
                </a>
              </NavLink>
            </li>
          ))}
      </ul>
      {/* End of top part menu */}

      <ul className="bg-light border-t border-border-200 py-4">
        {siteSettings.dashboardSidebarMenu?.slice(-1).map((item: any, idx) => (
          <li className="py-2" key={idx}>
            <NavLink
              href={item.href}
              activeClassName="border-l-4 border-accent text-accent"
            >
              <a className="block py-2 px-10 font-semibold text-heading transition-colors hover:text-accent focus:text-accent">
                {t(item.menulabel)}
              </a>
            </NavLink>
          </li>
        ))}
      </ul>
      {/* End of bottom part menu */}
    </aside>
  );
};

export default DashboardSidebar;
