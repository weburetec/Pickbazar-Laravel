import { Coupon, QueryParamsType } from "@ts-types/custom.types";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { mapPaginatorData } from "@utils/data-mappers";
import { useInfiniteQuery } from "react-query";
import { CouponService } from "./coupon.service";

export const fetchCoupons = async ({
  queryKey,
  pageParam,
}: QueryParamsType) => {
  const [_key, params] = queryKey;
  let fetchedData: any = {};
  if (pageParam) {
    const response = await CouponService.fetchUrl(pageParam);
    fetchedData = response.data;
  } else {
    const response = await CouponService.find(params);
    fetchedData = response.data;
  }

  const { data, ...rest } = fetchedData;
  return { data, paginatorInfo: mapPaginatorData({ ...rest }) };
};

export const useCouponsQuery = (options: any = { limit: 15 }) => {
  return useInfiniteQuery<{ data: Coupon[]; paginatorInfo: any }, Error>(
    [API_ENDPOINTS.COUPONS, options],
    fetchCoupons,
    {
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};
