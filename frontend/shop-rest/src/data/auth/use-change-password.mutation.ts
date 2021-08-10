import { useMutation } from "react-query";
import { AuthService, ChangePasswordInputType } from "./auth.service";

export const useChangePasswordMutation = () => {
  return useMutation((input: ChangePasswordInputType) =>
    AuthService.changePassword(input)
  );
};
