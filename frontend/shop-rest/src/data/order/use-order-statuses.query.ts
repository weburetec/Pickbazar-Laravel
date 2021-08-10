import { API_ENDPOINTS } from "@utils/api/endpoints";
import { mapPaginatorData } from "@utils/data-mappers";
import { useQuery } from "react-query";
import { OrderService } from "./order.service";

export const fetchOrderStatuses = async () => {
  const {
    data: { data, ...rest },
  } = await OrderService.fetchUrl(API_ENDPOINTS.ORDER_STATUS);
  return {
    order_statuses: { data, paginatorInfo: mapPaginatorData({ ...rest }) },
  };
};
export const useOrderStatusesQuery = () => {
  return useQuery<any, Error>(API_ENDPOINTS.ORDER_STATUS, fetchOrderStatuses);
};
