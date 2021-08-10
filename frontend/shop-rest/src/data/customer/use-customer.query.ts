import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";

const CustomerService = new CoreApi(API_ENDPOINTS.CUSTOMER);
export const fetchMe = async () => {
  const { data } = await CustomerService.findAll();
  return { me: data };
};

export const useCustomerQuery = () => {
  return useQuery<any, Error>(API_ENDPOINTS.CUSTOMER, fetchMe);
};
