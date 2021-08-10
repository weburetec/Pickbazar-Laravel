import { useState } from "react";
import cn from "classnames";
import { PencilIcon } from "@components/icons/pencil-icon";
import { CloseIcon } from "@components/icons/close-icon";
type RadioCardItem = {
  id: string | number;
  title: string;
  description: string;
};
interface Props {
  items: RadioCardItem[];
}

const RadioCardGroup = ({ items }: Props) => {
  const [selected, setSelected] = useState(0);
  return (
    <div className="grid gap-4 grid-cols-3">
      {items.map(({ id, title, description }, idx) => (
        <div
          key={id}
          className={cn(
            "relative p-4 rounded border cursor-pointer group hover:border-green-600",
            {
              "border-green-600 shadow-sm": selected === idx,
              "bg-gray-100 border-transparent": selected !== idx,
            }
          )}
          onClick={() => setSelected(idx)}
        >
          <p className="text-sm text-heading font-semibold mb-3">{title}</p>
          <p className="text-sm text-body-dark">{description}</p>
          <div className="absolute top-4 end-4 flex space-s-2 opacity-0 group-hover:opacity-100">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-600 text-light">
              <PencilIcon className="w-3 h-3" />
            </span>
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-light">
              <CloseIcon className="w-3 h-3" />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RadioCardGroup;
