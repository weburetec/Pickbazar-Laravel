import cn from "classnames";
import Link from "@components/ui/link";
import Button from "@components/ui/button";
import { useTranslation } from "next-i18next";

type CookieBarProps = {
  hide: boolean;
  content?: React.ReactNode;
  btnTitle?: string;
  className?: string;
  onClick: () => void;
};

const CookieBar: React.FC<CookieBarProps> = ({
  hide,
  content,
  btnTitle,
  onClick,
  className,
}) => {
  const { t } = useTranslation("common");

  // hide state style
  const hideClass = hide
    ? "translate-y-full opacity-0"
    : "translate-y-0 opacity-100";

  const defaultContent = (
    <p>
      {t("cookie-message")}{" "}
      <Link
        href="/privacy-policy"
        className="ms-1 text-heading underline hover:no-underline focus:no-underline focus:outline-dark"
      >
        {t("text-privacy-policy")}
      </Link>
      .
    </p>
  );

  return (
    <div
      className={cn(
        "fixed bottom-0 start-0 w-full z-50 bg-light shadow-2xl py-5 px-12 flex flex-col sm:flex-row sm:items-center sm:justify-between transform transition-all duration-300 ease-out",
        hideClass,
        className
      )}
    >
      <div className="text-body-dark mb-4 sm:mb-0 sm:pe-2">
        {content ? content : defaultContent}
      </div>
      <Button onClick={onClick}>
        {btnTitle ? btnTitle : t("text-accept")}
      </Button>
    </div>
  );
};

export default CookieBar;
