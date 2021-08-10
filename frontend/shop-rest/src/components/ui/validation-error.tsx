import { useTranslation } from "next-i18next";
interface Props {
  message: string | undefined;
}

const ValidationError = ({ message }: Props) => {
  const { t } = useTranslation();
  return <p className="my-2 text-sm text-start text-red-500">{t(message!)}</p>;
};

export default ValidationError;
