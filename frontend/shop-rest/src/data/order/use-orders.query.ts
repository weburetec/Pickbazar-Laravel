import {
  QueryParamsType,
  Order,
  OrdersQueryOptionsType,
} from "@ts-types/custom.types";
import { ParamsType } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { mapPaginatorData } from "@utils/data-mappers";
import {
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "react-query";
import { OrderService } from "./order.service";
type PaginatedOrder = {
  data: Order[];
  paginatorInfo: any;
};
const fetchOrders = async ({
  queryKey,
  pageParam,
}: QueryParamsType): Promise<PaginatedOrder> => {
  const [_key, params] = queryKey;
  let fetchedData: any = {};
  if (pageParam) {
    const response = await OrderService.fetchUrl(pageParam);
    fetchedData = response.data;
  } else {
    const response = await OrderService.find(params as ParamsType);
    fetchedData = response.data;
  }
  const { data, ...rest } = fetchedData;
  return { data, paginatorInfo: mapPaginatorData({ ...rest }) };
};

const useOrdersQuery = (
  params?: OrdersQueryOptionsType,
  options?: UseInfiniteQueryOptions<
    PaginatedOrder,
    Error,
    PaginatedOrder,
    PaginatedOrder,
    QueryKey
  >
) => {
  return useInfiniteQuery<PaginatedOrder, Error>(
    [API_ENDPOINTS.ORDER, params],
    fetchOrders,
    {
      ...options,
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export { useOrdersQuery, fetchOrders };
