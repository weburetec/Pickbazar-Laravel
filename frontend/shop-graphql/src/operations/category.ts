import {
  CategoriesDocument,
  QueryCategoriesHasTypeColumn,
  SortOrder,
  SqlOperator,
  QueryCategoriesOrderByColumn,
} from "@graphql/categories.graphql";

export interface IGetCategory {
  type: string;
  limit?: number;
  name?: string;
  parent?: number;
  page?: number;
  orderField?: QueryCategoriesOrderByColumn;
  sortOrder?: SortOrder;
}

export interface IMoreCategory {
  page: number;
  first: number;
}

export const getCategories = ({
  type,
  limit,
  name,
  parent,
  page = 1,
  orderField,
  sortOrder = SortOrder.Desc,
}: IGetCategory) => {
  return {
    hasType: {
      column: QueryCategoriesHasTypeColumn.Slug,
      operator: SqlOperator.Eq,
      value: type,
    },
    ...(orderField
      ? { orderBy: [{ field: orderField, order: sortOrder }] }
      : {}),
    ...(name ? { name: name } : {}),
    ...(parent ? { parent: parent } : {}),
    page,
    first: limit,
  };
};

export const getCategoriesInServer = ({
  type,
  limit,
  name,
  parent,
  page = 1,
  orderField,
  sortOrder = SortOrder.Desc,
}: IGetCategory) => {
  return {
    query: CategoriesDocument,
    variables: getCategories({
      type,
      limit,
      name,
      parent,
      page,
      orderField,
      sortOrder,
    }),
  };
};

export const getCategoriesInClient = ({
  type,
  limit,
  name,
  parent,
  page = 1,
  orderField,
  sortOrder = SortOrder.Desc,
}: IGetCategory) => {
  return {
    variables: getCategories({
      type,
      limit,
      name,
      parent,
      page,
      orderField,
      sortOrder,
    }),
  };
};

export const getMoreCategory = ({ page, first }: IMoreCategory) => {
  return {
    variables: {
      page,
      first,
    },
  };
};
