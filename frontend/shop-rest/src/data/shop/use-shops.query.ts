import {
  QueryParamsType,
  ShopsQueryOptionsType,
  Shop,
} from "@ts-types/custom.types";
import { CoreApi, ParamsType } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { mapPaginatorData } from "@utils/data-mappers";
import {
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "react-query";
const ShopService = new CoreApi(API_ENDPOINTS.SHOPS);
type PaginatedShop = {
  data: Shop[];
  paginatorInfo: any;
};
const fetchShops = async ({
  queryKey,
  pageParam,
}: QueryParamsType): Promise<PaginatedShop> => {
  const [_key, params] = queryKey;
  let fetchedData: any = {};
  if (pageParam) {
    const response = await ShopService.fetchUrl(pageParam);
    fetchedData = response.data;
  } else {
    const response = await ShopService.find(params as ParamsType);
    fetchedData = response.data;
  }
  const { data, ...rest } = fetchedData;
  return { data, paginatorInfo: mapPaginatorData({ ...rest }) };
};

const useShopsQuery = (
  params: ShopsQueryOptionsType = {},
  options?: UseInfiniteQueryOptions<
    PaginatedShop,
    Error,
    PaginatedShop,
    PaginatedShop,
    QueryKey
  >
) => {
  return useInfiniteQuery<PaginatedShop, Error>(
    [API_ENDPOINTS.SHOPS, params],
    fetchShops,
    {
      ...options,
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export { useShopsQuery, fetchShops };
