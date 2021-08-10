import {
  CategoriesQueryOptionsType,
  Category,
  QueryParamsType,
} from "@ts-types/custom.types";
import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";

const CategoryService = new CoreApi(API_ENDPOINTS.PARENT_CATEGORIES);
export const fetchCategories = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    data: { data },
  } = await CategoryService.find(params as CategoriesQueryOptionsType);
  return { categories: { data } };
};
export const useCategoriesQuery = (options: CategoriesQueryOptionsType) => {
  return useQuery<{ categories: { data: Category[] } }, Error>(
    [API_ENDPOINTS.PARENT_CATEGORIES, options],
    fetchCategories
  );
};
