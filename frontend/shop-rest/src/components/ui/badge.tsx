import cn from "classnames";
import { useTranslation } from "next-i18next";

type BadgeProps = {
  className?: string;
  color?: string;
  textColor?: string;
  text?: string;
  style?: any;
};

const Badge: React.FC<BadgeProps> = (props) => {
  const { t } = useTranslation();
  const {
    className,
    color: colorOverride,
    textColor: textColorOverride,
    text,
    style,
  } = props;

  const classes = {
    root: "px-3 py-1 rounded-full text-sm",
    default: "bg-accent",
    text: "text-light",
  };

  return (
    <span
      className={cn(
        classes.root,
        {
          [classes.default]: !colorOverride,
          [classes.text]: !textColorOverride,
        },
        colorOverride,
        textColorOverride,
        className
      )}
      style={style}
    >
      {t(text!)}
    </span>
  );
};

export default Badge;
