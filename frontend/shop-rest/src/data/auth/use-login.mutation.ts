import { useMutation } from "react-query";
import { AuthService, LoginInputType } from "./auth.service";

export const useLoginMutation = () => {
  return useMutation((input: LoginInputType) => AuthService.login(input));
};
