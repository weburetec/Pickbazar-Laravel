import cn from "classnames";
import { useTranslation } from "next-i18next";
interface Props {
  text?: string;
  className?: string;
}

const NotFound: React.FC<Props> = (props) => {
  const { t } = useTranslation("common");
  return (
    <div className={cn("flex flex-col items-center", props.className)}>
      <div className="w-full h-full flex items-center justify-center">
        <img
          src="/no-result.svg"
          alt={props.text ? t(props.text) : t("text-no-result-found")}
          className="w-full h-full object-contain"
        />
      </div>
      {props.text && (
        <h3 className="w-full text-center text-xl font-semibold text-body my-7">
          {t(props.text)}
        </h3>
      )}
    </div>
  );
};

export default NotFound;
