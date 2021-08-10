import Button from "@components/ui/button";
import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "next-i18next";
interface Props {
  onSubmit: (values: { email: string }) => void;
  loading: boolean;
}
const schema = yup.object().shape({
  email: yup
    .string()
    .email("error-email-format")
    .required("error-email-required"),
});

const EnterEmailView = ({ onSubmit, loading }: Props) => {
  const { t } = useTranslation("common");
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<{ email: string }>({ resolver: yupResolver(schema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        label={t("text-email")}
        {...register("email")}
        type="email"
        variant="outline"
        className="mb-5"
        placeholder="demo@demo.com"
        error={t(errors.email?.message!)}
      />
      <Button className="w-full h-11" loading={loading} disabled={loading}>
        {t("text-submit-email")}
      </Button>
    </form>
  );
};

export default EnterEmailView;
