import Button from "@components/ui/button";
import PasswordInput from "@components/ui/password-input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "next-i18next";
import * as yup from "yup";
interface Props {
  onSubmit: (values: { password: string }) => void;
  loading: boolean;
}
const schema = yup.object().shape({
  password: yup.string().required("error-password-required"),
});

const EnterNewPasswordView = ({ onSubmit, loading }: Props) => {
  const { t } = useTranslation("common");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ password: string }>({ resolver: yupResolver(schema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <PasswordInput
        label="text-password"
        {...register("password")}
        error={errors.password?.message}
        variant="outline"
        className="mb-5"
      />

      <Button className="w-full h-11" loading={loading} disabled={loading}>
        {t("text-reset-password")}
      </Button>
    </form>
  );
};

export default EnterNewPasswordView;
