import Button from "@components/ui/button";
import Input from "@components/ui/input";
import { useUpdateCustomerMutation } from "@graphql/auth.graphql";
import { maskPhoneNumber } from "@utils/mask-phone-number";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";

interface Props {
  initialValues: {
    contact: string;
  };
  userId: string;
  profileId: string;
}
interface FormValues {
  contact: string;
}
const defaultValues = {
  contact: "",
};
const ContactForm = ({ initialValues, userId, profileId }: Props) => {
  const { t } = useTranslation("common");
  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialValues ?? defaultValues,
  });
  const [updateProfile] = useUpdateCustomerMutation();
  function onSubmit(value: FormValues) {
    updateProfile({
      variables: {
        id: userId,
        profile: {
          upsert: {
            id: profileId,
            contact: value.contact,
          },
        },
      },
    });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex">
      <Input
        {...register("contact")}
        label={t("text-enter-contact-number")}
        className="flex-1"
        onChange={(e) => setValue("contact", maskPhoneNumber(e.target.value))}
        error={t(errors?.contact?.message!)}
      />
      <Button>
        {initialValues ? t("text-edit") : t("text-add")} {t("nav-menu-contact")}
      </Button>
    </form>
  );
};

export default ContactForm;
