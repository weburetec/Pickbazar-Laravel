import {
  SortOrder,
  SqlOperator,
  ProductStatus,
  ProductsDocument,
  QueryProductsHasTypeColumn,
  QueryProductsOrderByColumn,
  QueryCategoriesHasTypeColumn,
} from "@graphql/products.graphql";
import { ProductDocument } from "@graphql/product.graphql";

export interface IGetProducts {
  type: string;
  limit: number;
  text?: string;
  category?: string;
  page?: number;
  status?: ProductStatus;
  orderField?: QueryProductsOrderByColumn;
  sortOrder?: SortOrder;
}

export interface IGetProduct {
  id?: string;
  slug?: string;
}

export interface IMoreProducts {
  page: number;
  first: number;
}

export const getProducts = ({
  type,
  limit,
  text,
  category,
  page = 1,
  status = ProductStatus.Publish,
  orderField = QueryProductsOrderByColumn.CreatedAt,
  sortOrder = SortOrder.Asc,
}: IGetProducts) => {
  return {
    hasType: {
      column: QueryProductsHasTypeColumn.Slug,
      operator: SqlOperator.Eq,
      value: type,
    },
    ...(text ? { text: `%${text}%` } : {}),
    ...(category
      ? {
          hasCategories: {
            column: QueryCategoriesHasTypeColumn.Slug,
            operator: SqlOperator.Eq,
            value: category ?? null,
          },
        }
      : {}),
    ...(orderField
      ? { orderBy: [{ column: orderField, order: sortOrder }] }
      : {}),
    page,
    status,
    first: limit,
  };
};

export const getProductsInServer = ({
  type,
  limit,
  text,
  category,
  page = 1,
  status = ProductStatus.Publish,
  orderField,
  sortOrder = SortOrder.Asc,
}: IGetProducts) => {
  return {
    query: ProductsDocument,
    variables: getProducts({
      type,
      limit,
      text,
      category,
      page,
      status,
      orderField,
      sortOrder,
    }),
  };
};

export const getProductsInClient = ({
  type,
  limit,
  text,
  category,
  page = 1,
  status = ProductStatus.Publish,
  orderField,
  sortOrder = SortOrder.Asc,
}: IGetProducts) => {
  return {
    variables: getProducts({
      type,
      limit,
      text,
      category,
      page,
      status,
      orderField,
      sortOrder,
    }),
    notifyOnNetworkStatusChange: true,
  };
};

export const getMoreProducts = ({ page, first }: IMoreProducts) => {
  return {
    variables: {
      page,
      first,
    },
  };
};

export const getProduct = ({ id, slug }: IGetProduct) => {
  return {
    ...(id ? { id: id } : {}),
    ...(slug ? { slug: slug } : {}),
  };
};

export const getProductInServer = ({ id, slug }: IGetProduct) => {
  return {
    query: ProductDocument,
    variables: getProduct({ id, slug }),
  };
};

export const getProductInClient = ({ id, slug }: IGetProduct) => {
  return {
    variables: getProduct({ id, slug }),
    notifyOnNetworkStatusChange: true,
  };
};
