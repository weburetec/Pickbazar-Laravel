import { useMutation } from "react-query";
import { AuthService, ResetPasswordInputType } from "./auth.service";

export const useResetPasswordMutation = () => {
  return useMutation((input: ResetPasswordInputType) =>
    AuthService.resetPassword(input)
  );
};
