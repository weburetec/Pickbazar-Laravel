import { useMutation } from "react-query";
import { AuthService, SocialLoginInputType } from "./auth.service";

export const useSocialLoginMutation = () => {
	return useMutation((input: SocialLoginInputType) =>
		AuthService.socialLogin(input)
	);
};
