import cn from "classnames";

type CategoryCardProps = {
  thumb: React.ReactNode;
  title: string;
  active: boolean;
  onClick: () => void;
  className?: string;
};

const CategoryCard: React.FC<CategoryCardProps> = ({
  thumb,
  title,
  active,
  onClick,
  className,
}) => {
  // active state style
  const activeClass = active
    ? "shadow-sm border-gray-700"
    : "border-transparent";
  const activeTextStyle = active
    ? "font-semibold text-heading"
    : "font-normal text-sub-heading";

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 rounded border border-solid",
        activeClass,
        className
      )}
    >
      <div className="py-5 px-4 mb-2.5">{thumb}</div>
      <div className={cn("capitalize px-4 pb-5", activeTextStyle)}>{title}</div>
    </div>
  );
};

export default CategoryCard;
