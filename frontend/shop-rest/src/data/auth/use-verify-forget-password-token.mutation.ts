import { useMutation } from "react-query";
import { AuthService, VerifyPasswordInputType } from "./auth.service";

export const useVerifyForgetPasswordTokenMutation = () => {
  return useMutation((input: VerifyPasswordInputType) =>
    AuthService.verifyForgetPassword(input)
  );
};
