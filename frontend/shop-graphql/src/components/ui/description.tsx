import { useTranslation } from "next-i18next";

type Props = {
  className?: string;
  title?: string;
  details?: string;
  [key: string]: unknown;
};

const Description: React.FC<Props> = ({
  title,
  details,
  className,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <div className={className} {...props}>
      {title && (
        <h4 className="text-base font-semibold text-body-dark mb-2">
          {t(title)}
        </h4>
      )}
      {details && <p className="text-sm text-body">{t(details)}</p>}
    </div>
  );
};

export default Description;
