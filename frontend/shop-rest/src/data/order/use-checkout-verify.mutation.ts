import { useMutation } from "react-query";
import { OrderService, VerifyCheckoutInputType } from "./order.service";

export const useVerifyCheckoutMutation = () => {
  return useMutation((input: VerifyCheckoutInputType) =>
    OrderService.verifyCheckout(input)
  );
};
