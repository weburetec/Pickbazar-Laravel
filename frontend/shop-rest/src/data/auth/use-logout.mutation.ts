import { useMutation } from "react-query";
import { AuthService } from "./auth.service";

export const useLogoutMutation = () => {
  return useMutation(() => AuthService.logout());
};
