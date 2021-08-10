import { useMutation } from "react-query";
import { CouponService, VerifyCouponInputType } from "./coupon.service";

export const useVerifyCouponMutation = () => {
  return useMutation((input: VerifyCouponInputType) =>
    CouponService.verifyCoupon(input)
  );
};
