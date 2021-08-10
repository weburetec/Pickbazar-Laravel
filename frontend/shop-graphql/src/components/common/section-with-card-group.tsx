import { useState } from "react";
import cn from "classnames";
import { CloseIcon } from "@components/icons/close-icon";
import { PencilIcon } from "@components/icons/pencil-icon";
import { PlusIcon } from "@components/icons/plus-icon";
import { formatAddress } from "@utils/format-address";
import { useTranslation } from "next-i18next";

interface ICardItem {
  id: string | number;
  title: string;
  description: string;
  address?: any;
  // default: boolean;
}
interface Props {
  count?: number;
  heading: string;
  addActionText?: string;
  items: ICardItem[] | undefined;
  onSelect: (item: any) => void;
  onAdd?: () => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

const SectionWithCardGroup = ({
  count,
  heading,
  addActionText,
  items,
  onAdd,
  onEdit,
  onDelete,
  onSelect,
}: Props) => {
  const { t } = useTranslation("common");
  const [selected, setSelected] = useState(0);
  function select(item: any, idx: number) {
    setSelected(idx);
    onSelect(item);
  }

  return (
    <>
      <div className="flex items-center justify-between mb-5 md:mb-8">
        <div className="flex items-center space-s-3 md:space-s-4">
          {count && (
            <span className="rounded-full w-8 h-8 bg-accent flex items-center justify-center text-base lg:text-xl text-light">
              {count}
            </span>
          )}
          <p className="text-lg lg:text-xl text-heading capitalize">
            {t(heading)}
          </p>
        </div>
        {onAdd && (
          <button
            className="flex items-center text-sm font-semibold text-accent transition-colors duration-200 focus:outline-none focus:text-accent-hover hover:text-accent-hover"
            onClick={onAdd}
          >
            <PlusIcon className="w-4 h-4 stroke-2 me-0.5" />
            {t("text-add")}{" "}
            <span className="hidden sm:inline-block sm:ms-1">
              {t(addActionText!)}
            </span>
          </button>
        )}
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {items?.length ? (
          items?.map((item, idx) => (
            <div
              key={item.id}
              className={cn(
                "relative p-4 rounded border cursor-pointer group hover:border-accent",
                {
                  "border-accent shadow-sm": selected === idx,
                  "bg-gray-100 border-transparent": selected !== idx,
                }
              )}
              onClick={() => select(item, idx)}
            >
              <p className="text-sm text-heading font-semibold mb-3 capitalize">
                {item.title}
              </p>
              <p className="text-sm text-sub-heading">
                {item.description
                  ? item.description
                  : formatAddress(item.address)}
              </p>
              <div className="absolute top-4 end-4 flex space-s-2 opacity-0 group-hover:opacity-100">
                {onEdit && (
                  <button
                    className="flex items-center justify-center w-5 h-5 rounded-full bg-accent text-light"
                    onClick={() => onEdit(item)}
                  >
                    <span className="sr-only">{t("text-edit")}</span>
                    <PencilIcon className="w-3 h-3" />
                  </button>
                )}
                {onDelete && (
                  <button
                    className="flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-light"
                    onClick={() => onDelete(item)}
                  >
                    <span className="sr-only">{t("text-delete")}</span>
                    <CloseIcon className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="relative px-5 py-6 text-base text-center bg-gray-100 rounded border border-border-200">
            {t("text-no-address")}
          </div>
        )}
      </div>
    </>
  );
};

export default SectionWithCardGroup;
