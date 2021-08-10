import { useMutation } from "react-query";
import { AuthService, ForgetPasswordInputType } from "./auth.service";

export const useForgetPasswordMutation = () => {
  return useMutation((input: ForgetPasswordInputType) =>
    AuthService.forgetPassword(input)
  );
};
