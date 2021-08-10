import { Shop } from "@ts-types/custom.types";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";
import { useQuery } from "react-query";

export const fetchShop = async (slug: string) => {
  const { data } = await http.get(`${API_ENDPOINTS.SHOPS}/${slug}`);
  return data;
};

export const useShopQuery = (slug: string) => {
  return useQuery<Shop, Error>([API_ENDPOINTS.SHOPS, slug], () =>
    fetchShop(slug)
  );
};
