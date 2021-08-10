import { Type } from "@ts-types/custom.types";
import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";

const TypeService = new CoreApi(API_ENDPOINTS.TYPE);
export const fetchTypes = async () => {
  const { data } = await TypeService.findAll();
  return { types: data as Type[] };
};
export const useTypesQuery = () => {
  return useQuery<{ types: Type[] }, Error>(API_ENDPOINTS.TYPE, fetchTypes);
};
