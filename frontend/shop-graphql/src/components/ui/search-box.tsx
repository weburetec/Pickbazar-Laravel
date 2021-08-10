import { InputHTMLAttributes } from "react";
import cn from "classnames";
import { SearchIcon } from "@components/icons/search-icon";
import { CloseIcon } from "@components/icons/close-icon";
import { useTranslation } from "next-i18next";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label: string;
  variant?: "minimal" | "normal";
  onSubmit: (e: any) => void;
  onClearSearch: (e: any) => void;
}

const classes = {
  normal:
    "bg-light ps-6 pe-14 rounded-te-none rounded-be-none  border border-e-0 border-transparent focus:border-accent",
  minimal:
    "bg-gray-100 ps-10 pe-12 md:ps-14 border border-border-200 focus:border-accent focus:bg-light",
};

const SearchBox: React.FC<Props> = ({
  className,
  label,
  onSubmit,
  onClearSearch,
  variant = "normal",
  value,
  ...rest
}) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div
        className={cn(
          "rounded md:rounded-lg flex relative",
          variant === "normal" ? "h-14 shadow-900" : "h-11 md:h-12"
        )}
      >
        <label htmlFor={label} className="sr-only">
          {label}
        </label>

        <input
          id={label}
          type="text"
          value={value}
          autoComplete="off"
          className={cn(
            "w-full h-full flex item-center appearance-none transition duration-300 ease-in-out text-heading text-sm placeholder-gray-500 overflow-hidden rounded-lg focus:outline-none focus:ring-0",
            classes[variant]
          )}
          {...rest}
        />
        {value && (
          <button
            type="button"
            onClick={onClearSearch}
            className={cn(
              "cursor-pointer h-full w-10 md:w-14 flex items-center justify-center absolute text-body transition-colors duration-200 focus:outline-none hover:text-accent-hover focus:text-accent-hover",
              {
                "end-36": variant === "normal",
                "end-0": variant !== "normal",
              }
            )}
          >
            <span className="sr-only">{t("common:text-close")}</span>
            <CloseIcon className="w-3.5 h-3.5 md:w-3 md:h-3" />
          </button>
        )}

        {variant === "normal" ? (
          <button className="h-full px-8 flex items-center rounded-lg rounded-ts-none rounded-bs-none bg-accent text-light font-semibold transition-colors duration-200 focus:outline-none hover:bg-accent-hover focus:bg-accent-hover">
            <SearchIcon className="w-4 h-4 me-2.5" />
            {t("common:text-search")}
          </button>
        ) : (
          <button className="h-full w-10 md:w-14 flex items-center justify-center absolute start-0 text-body transition-colors duration-200 focus:outline-none hover:text-accent-hover focus:text-accent-hover">
            <span className="sr-only">{t("common:text-search")}</span>
            <SearchIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBox;
