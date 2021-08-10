import { useMutation } from "react-query";
import { AuthService, RegisterUserInputType } from "./auth.service";

export const useRegisterMutation = () => {
  return useMutation((input: RegisterUserInputType) =>
    AuthService.register(input)
  );
};
