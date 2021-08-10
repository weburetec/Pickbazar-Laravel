import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { CustomerService, ContactType } from "./customer.service";

export const useContactMutation = () => {
  return useMutation((input: ContactType) => CustomerService.contact(input), {
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
  });
};
