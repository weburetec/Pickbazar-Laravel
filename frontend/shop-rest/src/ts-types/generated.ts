export declare type Maybe<T> = T | null;
export declare type Exact<
  T extends {
    [key: string]: unknown;
  }
> = {
  [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  {
    [SubKey in K]?: Maybe<T[SubKey]>;
  };
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  {
    [SubKey in K]: Maybe<T[SubKey]>;
  };
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A datetime string with format `Y-m-d H:i:s`, e.g. `2018-05-23 13:43:32`. */
  DateTime: any;
  /**
   * Loose type that allows any value. Be careful when passing in large `Int` or `Float` literals,
   * as they may not be parsed correctly on the server side. Use `String` literals if you are
   * dealing with really large numbers to be on the safe side.
   */
  Mixed: any;
  Upload: any;
  /** A date string with format `Y-m-d`, e.g. `2011-05-23`. */
  Date: any;
  /** A datetime and timezone string in ISO 8601 format `Y-m-dTH:i:sO`, e.g. `2020-04-20T13:53:12+02:00`. */
  DateTimeTz: any;
};
export declare type Query = {
  __typename?: "Query";
  address: Array<Address>;
  singleAddress?: Maybe<Address>;
  attributes: Array<Attribute>;
  attribute?: Maybe<Attribute>;
  attributeValues: Array<AttributeValue>;
  attributeValue?: Maybe<AttributeValue>;
  categories?: Maybe<CategoryPaginator>;
  category?: Maybe<Category>;
  coupons?: Maybe<CouponPaginator>;
  coupon?: Maybe<Coupon>;
  orders?: Maybe<OrderPaginator>;
  order?: Maybe<Order>;
  order_statuses?: Maybe<OrderStatusPaginator>;
  order_status?: Maybe<OrderStatus>;
  products?: Maybe<ProductPaginator>;
  product?: Maybe<Product>;
  profiles: Array<Profile>;
  singleProfile?: Maybe<Profile>;
  settings?: Maybe<Settings>;
  types: Array<Type>;
  type?: Maybe<Type>;
  users?: Maybe<UserPaginator>;
  user?: Maybe<User>;
  me?: Maybe<User>;
};
export declare type QuerySingleAddressArgs = {
  id?: Maybe<Scalars["ID"]>;
};
export declare type QueryAttributeArgs = {
  id?: Maybe<Scalars["ID"]>;
  slug?: Maybe<Scalars["String"]>;
};
export declare type QueryAttributeValueArgs = {
  id?: Maybe<Scalars["ID"]>;
};
export declare type QueryCategoriesArgs = {
  orderBy?: Maybe<Array<CategoriesOrderByOrderByClause>>;
  name?: Maybe<Scalars["String"]>;
  parent?: Maybe<Scalars["Int"]>;
  hasType?: Maybe<CategoriesHasTypeWhereConditions>;
  first?: Maybe<Scalars["Int"]>;
  page?: Maybe<Scalars["Int"]>;
};
export declare type QueryCategoryArgs = {
  id?: Maybe<Scalars["ID"]>;
  slug?: Maybe<Scalars["String"]>;
};
export declare type QueryCouponsArgs = {
  first: Scalars["Int"];
  page?: Maybe<Scalars["Int"]>;
};
export declare type QueryCouponArgs = {
  id?: Maybe<Scalars["ID"]>;
  code?: Maybe<Scalars["String"]>;
};
export declare type QueryOrdersArgs = {
  tracking_number?: Maybe<Scalars["String"]>;
  orderBy?: Maybe<Array<OrdersOrderByOrderByClause>>;
  customer_id?: Maybe<Scalars["Int"]>;
  first?: Maybe<Scalars["Int"]>;
  page?: Maybe<Scalars["Int"]>;
};
export declare type QueryOrderArgs = {
  id?: Maybe<Scalars["ID"]>;
  tracking_number?: Maybe<Scalars["String"]>;
};
export declare type QueryOrder_StatusesArgs = {
  first?: Maybe<Scalars["Int"]>;
  page?: Maybe<Scalars["Int"]>;
};
export declare type QueryOrder_StatusArgs = {
  OrderStatus?: Maybe<Scalars["ID"]>;
};
export declare type QueryProductsArgs = {
  orderBy?: Maybe<Array<ProductsOrderByOrderByClause>>;
  text?: Maybe<Scalars["String"]>;
  status?: Maybe<Scalars["String"]>;
  hasType?: Maybe<ProductsHasTypeWhereConditions>;
  hasCategories?: Maybe<ProductsHasCategoriesWhereConditions>;
  first?: Maybe<Scalars["Int"]>;
  page?: Maybe<Scalars["Int"]>;
};
export declare type QueryProductArgs = {
  id?: Maybe<Scalars["ID"]>;
  slug?: Maybe<Scalars["String"]>;
};
export declare type QueryProfilesArgs = {
  contact?: Maybe<Scalars["String"]>;
};
export declare type QuerySingleProfileArgs = {
  id?: Maybe<Scalars["ID"]>;
};
export declare type QueryTypesArgs = {
  orderBy?: Maybe<Array<TypesOrderByOrderByClause>>;
  name?: Maybe<Scalars["String"]>;
  slug?: Maybe<Scalars["String"]>;
};
export declare type QueryTypeArgs = {
  id?: Maybe<Scalars["ID"]>;
  slug?: Maybe<Scalars["String"]>;
};
export declare type QueryUsersArgs = {
  first?: Maybe<Scalars["Int"]>;
  page?: Maybe<Scalars["Int"]>;
};
export declare type QueryUserArgs = {
  id?: Maybe<Scalars["ID"]>;
};
export declare type Address = {
  __typename?: "Address";
  id: Scalars["ID"];
  title?: Maybe<Scalars["String"]>;
  default?: Maybe<Scalars["Boolean"]>;
  address?: Maybe<UserAddress>;
  type?: Maybe<Scalars["String"]>;
  customer?: Maybe<User>;
};
export declare type UserAddress = {
  __typename?: "UserAddress";
  country?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  state?: Maybe<Scalars["String"]>;
  zip?: Maybe<Scalars["String"]>;
};
export declare type User = {
  __typename?: "User";
  id: Scalars["ID"];
  name: Scalars["String"];
  email: Scalars["String"];
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
  profile?: Maybe<Profile>;
  address: Array<Address>;
  orders?: Maybe<OrderPaginator>;
};
export declare type UserOrdersArgs = {
  first?: Maybe<Scalars["Int"]>;
  page?: Maybe<Scalars["Int"]>;
};
export declare type Profile = {
  __typename?: "Profile";
  id: Scalars["ID"];
  avatar?: Maybe<Scalars["String"]>;
  bio?: Maybe<Scalars["String"]>;
  socials?: Maybe<Array<Maybe<Soical>>>;
  customer?: Maybe<User>;
};
export declare type Soical = {
  __typename?: "Soical";
  type?: Maybe<Scalars["String"]>;
  link?: Maybe<Scalars["String"]>;
};
/** A paginated list of Order items. */
export declare type OrderPaginator = {
  __typename?: "OrderPaginator";
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Order items. */
  data: Array<Order>;
};
/** Pagination information about the corresponding list of items. */
export declare type PaginatorInfo = {
  __typename?: "PaginatorInfo";
  /** Total count of available items in the page. */
  count: Scalars["Int"];
  /** Current pagination page. */
  currentPage: Scalars["Int"];
  /** Index of first item in the current page. */
  firstItem?: Maybe<Scalars["Int"]>;
  /** If collection has more pages. */
  hasMorePages: Scalars["Boolean"];
  /** Index of last item in the current page. */
  lastItem?: Maybe<Scalars["Int"]>;
  /** Last page number of the collection. */
  lastPage: Scalars["Int"];
  /** Number of items per page in the collection. */
  perPage: Scalars["Int"];
  /** Total items available in the collection. */
  total: Scalars["Int"];
};
export declare type Order = {
  __typename?: "Order";
  id: Scalars["ID"];
  tracking_number: Scalars["String"];
  customer_id: Scalars["Int"];
  customer?: Maybe<User>;
  status: OrderStatus;
  amount: Scalars["Float"];
  sales_tax: Scalars["Float"];
  total: Scalars["Float"];
  paid_total: Scalars["Float"];
  payment_id?: Maybe<Scalars["String"]>;
  payment_gateway?: Maybe<Scalars["String"]>;
  coupon?: Maybe<Coupon>;
  discount?: Maybe<Scalars["Float"]>;
  delivery_fee?: Maybe<Scalars["Float"]>;
  delivery_time: Scalars["String"];
  products: Array<Product>;
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
  billing_address?: Maybe<UserAddress>;
  shipping_address?: Maybe<UserAddress>;
};
export declare type OrderStatus = {
  __typename?: "OrderStatus";
  id: Scalars["ID"];
  name: Scalars["String"];
  is_default: Scalars["Boolean"];
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
};
export declare type Coupon = {
  __typename?: "Coupon";
  id: Scalars["ID"];
  code: Scalars["String"];
  description: Scalars["String"];
  orders: Array<Order>;
  type: Scalars["String"];
  image: Scalars["String"];
  amount: Scalars["Float"];
  active_from: Scalars["DateTime"];
  expire_at: Scalars["DateTime"];
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
};
export declare type Product = {
  __typename?: "Product";
  id: Scalars["ID"];
  name: Scalars["String"];
  slug: Scalars["String"];
  type: Type;
  categories: Array<Category>;
  variations: Array<AttributeValue>;
  pivot?: Maybe<OrderProductPivot>;
  orders: Array<Order>;
  description?: Maybe<Scalars["String"]>;
  in_stock?: Maybe<Scalars["Boolean"]>;
  is_taxable?: Maybe<Scalars["Boolean"]>;
  sale_price?: Maybe<Scalars["Float"]>;
  sku?: Maybe<Scalars["String"]>;
  gallery?: Maybe<Array<Maybe<Attachment>>>;
  image?: Maybe<Attachment>;
  status?: Maybe<ProductStatus>;
  height?: Maybe<Scalars["String"]>;
  length?: Maybe<Scalars["String"]>;
  width?: Maybe<Scalars["String"]>;
  price: Scalars["Float"];
  quantity?: Maybe<Scalars["Int"]>;
  unit?: Maybe<Scalars["String"]>;
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
};
export declare type Type = {
  __typename?: "Type";
  id: Scalars["ID"];
  name: Scalars["String"];
  slug: Scalars["String"];
  products?: Maybe<ProductPaginator>;
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
};
export declare type TypeProductsArgs = {
  orderBy?: Maybe<Array<ProductsOrderByOrderByClause>>;
  text?: Maybe<Scalars["String"]>;
  status?: Maybe<Scalars["String"]>;
  first: Scalars["Int"];
  page?: Maybe<Scalars["Int"]>;
};
/** Order by clause for the `orderBy` argument on the query `products`. */
export declare type ProductsOrderByOrderByClause = {
  /** The column that is used for ordering. */
  field: ProductsOrderByColumn;
  /** The direction that is used for ordering. */
  order: SortOrder;
};
/** Allowed column names for the `orderBy` argument on the query `products`. */
export enum ProductsOrderByColumn {
  CreatedAt = "CREATED_AT",
  Name = "NAME",
}
/** The available directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = "ASC",
  /** Sort records in descending order. */
  Desc = "DESC",
}
/** A paginated list of Product items. */
export declare type ProductPaginator = {
  __typename?: "ProductPaginator";
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Product items. */
  data: Array<Product>;
};
export declare type Category = {
  __typename?: "Category";
  id: Scalars["ID"];
  name: Scalars["String"];
  slug: Scalars["String"];
  parent?: Maybe<Scalars["Int"]>;
  children: Array<Category>;
  details?: Maybe<Scalars["String"]>;
  image?: Maybe<Attachment>;
  icon?: Maybe<Scalars["String"]>;
  type: Type;
  products: Array<Product>;
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
};
export declare type Attachment = {
  __typename?: "Attachment";
  thumbnail?: Maybe<Scalars["String"]>;
  original?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
};
export declare type AttributeValue = {
  __typename?: "AttributeValue";
  id: Scalars["ID"];
  value?: Maybe<Scalars["String"]>;
  attribute?: Maybe<Attribute>;
  products: Array<Product>;
  pivot?: Maybe<VariationProductPivot>;
};
export declare type Attribute = {
  __typename?: "Attribute";
  name: Scalars["String"];
  slug: Scalars["String"];
  values: Array<AttributeValue>;
};
export declare type VariationProductPivot = {
  __typename?: "VariationProductPivot";
  price?: Maybe<Scalars["Float"]>;
};
export declare type OrderProductPivot = {
  __typename?: "OrderProductPivot";
  order_quantity?: Maybe<Scalars["Int"]>;
  unit_price?: Maybe<Scalars["Float"]>;
  subtotal?: Maybe<Scalars["Float"]>;
};
export enum ProductStatus {
  Publish = "publish",
  Draft = "draft",
}
/** Order by clause for the `orderBy` argument on the query `categories`. */
export declare type CategoriesOrderByOrderByClause = {
  /** The column that is used for ordering. */
  field: CategoriesOrderByColumn;
  /** The direction that is used for ordering. */
  order: SortOrder;
};
/** Allowed column names for the `orderBy` argument on the query `categories`. */
export enum CategoriesOrderByColumn {
  CreatedAt = "CREATED_AT",
  Name = "NAME",
}
/** Dynamic WHERE conditions for the `hasType` argument on the query `categories`. */
export declare type CategoriesHasTypeWhereConditions = {
  /** The column that is used for the condition. */
  column?: Maybe<CategoriesHasTypeColumn>;
  /** The operator that is used for the condition. */
  operator?: Maybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: Maybe<Scalars["Mixed"]>;
  /** A set of conditions that requires all conditions to match. */
  AND?: Maybe<Array<CategoriesHasTypeWhereConditions>>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: Maybe<Array<CategoriesHasTypeWhereConditions>>;
};
/** Allowed column names for the `hasType` argument on the query `categories`. */
export enum CategoriesHasTypeColumn {
  Slug = "SLUG",
}
/** The available SQL operators that are used to filter query results. */
export enum SqlOperator {
  /** Equal operator (`=`) */
  Eq = "EQ",
  /** Not equal operator (`!=`) */
  Neq = "NEQ",
  /** Greater than operator (`>`) */
  Gt = "GT",
  /** Greater than or equal operator (`>=`) */
  Gte = "GTE",
  /** Less than operator (`<`) */
  Lt = "LT",
  /** Less than or equal operator (`<=`) */
  Lte = "LTE",
  /** Simple pattern matching (`LIKE`) */
  Like = "LIKE",
  /** Negation of simple pattern matching (`NOT LIKE`) */
  NotLike = "NOT_LIKE",
  /** Whether a value is within a set of values (`IN`) */
  In = "IN",
  /** Whether a value is not within a set of values (`NOT IN`) */
  NotIn = "NOT_IN",
  /** Whether a value is within a range of values (`BETWEEN`) */
  Between = "BETWEEN",
  /** Whether a value is not within a range of values (`NOT BETWEEN`) */
  NotBetween = "NOT_BETWEEN",
  /** Whether a value is null (`IS NULL`) */
  IsNull = "IS_NULL",
  /** Whether a value is not null (`IS NOT NULL`) */
  IsNotNull = "IS_NOT_NULL",
}
/** A paginated list of Category items. */
export declare type CategoryPaginator = {
  __typename?: "CategoryPaginator";
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Category items. */
  data: Array<Category>;
};
/** A paginated list of Coupon items. */
export declare type CouponPaginator = {
  __typename?: "CouponPaginator";
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Coupon items. */
  data: Array<Coupon>;
};
/** Order by clause for the `orderBy` argument on the query `orders`. */
export declare type OrdersOrderByOrderByClause = {
  /** The column that is used for ordering. */
  field: OrdersOrderByColumn;
  /** The direction that is used for ordering. */
  order: SortOrder;
};
/** Allowed column names for the `orderBy` argument on the query `orders`. */
export enum OrdersOrderByColumn {
  CreatedAt = "CREATED_AT",
  UpdatedAt = "UPDATED_AT",
}
/** A paginated list of OrderStatus items. */
export declare type OrderStatusPaginator = {
  __typename?: "OrderStatusPaginator";
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of OrderStatus items. */
  data: Array<OrderStatus>;
};
/** Dynamic WHERE conditions for the `hasType` argument on the query `products`. */
export declare type ProductsHasTypeWhereConditions = {
  /** The column that is used for the condition. */
  column?: Maybe<ProductsHasTypeColumn>;
  /** The operator that is used for the condition. */
  operator?: Maybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: Maybe<Scalars["Mixed"]>;
  /** A set of conditions that requires all conditions to match. */
  AND?: Maybe<Array<ProductsHasTypeWhereConditions>>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: Maybe<Array<ProductsHasTypeWhereConditions>>;
};
/** Allowed column names for the `hasType` argument on the query `products`. */
export enum ProductsHasTypeColumn {
  Slug = "SLUG",
}
/** Dynamic WHERE conditions for the `hasCategories` argument on the query `products`. */
export declare type ProductsHasCategoriesWhereConditions = {
  /** The column that is used for the condition. */
  column?: Maybe<ProductsHasCategoriesColumn>;
  /** The operator that is used for the condition. */
  operator?: Maybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: Maybe<Scalars["Mixed"]>;
  /** A set of conditions that requires all conditions to match. */
  AND?: Maybe<Array<ProductsHasCategoriesWhereConditions>>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: Maybe<Array<ProductsHasCategoriesWhereConditions>>;
};
/** Allowed column names for the `hasCategories` argument on the query `products`. */
export enum ProductsHasCategoriesColumn {
  Slug = "SLUG",
}
export declare type Settings = {
  __typename?: "Settings";
  id: Scalars["ID"];
  options: Scalars["String"];
  address: UserAddress;
  type: Scalars["String"];
  customer?: Maybe<User>;
};
/** Order by clause for the `orderBy` argument on the query `types`. */
export declare type TypesOrderByOrderByClause = {
  /** The column that is used for ordering. */
  field: TypesOrderByColumn;
  /** The direction that is used for ordering. */
  order: SortOrder;
};
/** Allowed column names for the `orderBy` argument on the query `types`. */
export enum TypesOrderByColumn {
  CreatedAt = "CREATED_AT",
  Name = "NAME",
}
/** A paginated list of User items. */
export declare type UserPaginator = {
  __typename?: "UserPaginator";
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of User items. */
  data: Array<User>;
};
export declare type Mutation = {
  __typename?: "Mutation";
  upload?: Maybe<Array<Maybe<Attachment>>>;
  createAddress?: Maybe<Address>;
  updateAddress?: Maybe<Address>;
  deleteAddress?: Maybe<Address>;
  createAttribute?: Maybe<Attribute>;
  updateAttribute?: Maybe<Attribute>;
  deleteAttribute?: Maybe<Attribute>;
  createAttributeValue?: Maybe<AttributeValue>;
  updateAttributeValue?: Maybe<AttributeValue>;
  deleteAttributeValue?: Maybe<AttributeValue>;
  deleteCategory?: Maybe<Category>;
  createCategory?: Maybe<Category>;
  updateCategory?: Maybe<Category>;
  verifyCheckout?: Maybe<VerifiedCheckoutdata>;
  createCoupon?: Maybe<Coupon>;
  updateCoupon?: Maybe<Coupon>;
  deleteCoupon?: Maybe<Coupon>;
  restoreCoupon?: Maybe<Coupon>;
  deleteOrder?: Maybe<Order>;
  updateOrder?: Maybe<Order>;
  createOrder?: Maybe<Order>;
  createOrderStatus?: Maybe<OrderStatus>;
  updateOrderStatus?: Maybe<OrderStatus>;
  deleteOrderStatus?: Maybe<OrderStatus>;
  deleteProduct?: Maybe<Product>;
  createProduct?: Maybe<Product>;
  updateProduct?: Maybe<Product>;
  createProfile?: Maybe<Profile>;
  updateProfile?: Maybe<Profile>;
  deleteProfile?: Maybe<Profile>;
  updateSettings?: Maybe<Settings>;
  deleteType?: Maybe<Type>;
  createorUpdateType?: Maybe<Type>;
  token?: Maybe<Scalars["String"]>;
  register?: Maybe<Scalars["String"]>;
};
export declare type MutationUploadArgs = {
  attachment: Array<Scalars["Upload"]>;
};
export declare type MutationCreateAddressArgs = {
  input?: Maybe<AddressInput>;
};
export declare type MutationUpdateAddressArgs = {
  id: Scalars["ID"];
  input?: Maybe<AddressInput>;
};
export declare type MutationDeleteAddressArgs = {
  id: Scalars["ID"];
};
export declare type MutationCreateAttributeArgs = {
  input?: Maybe<AttributeInput>;
};
export declare type MutationUpdateAttributeArgs = {
  id: Scalars["ID"];
  input?: Maybe<AttributeInput>;
};
export declare type MutationDeleteAttributeArgs = {
  id: Scalars["ID"];
};
export declare type MutationCreateAttributeValueArgs = {
  input?: Maybe<AttributeValueCreateInput>;
};
export declare type MutationUpdateAttributeValueArgs = {
  input?: Maybe<AttributeValueUpdateInput>;
};
export declare type MutationDeleteAttributeValueArgs = {
  id: Scalars["ID"];
};
export declare type MutationDeleteCategoryArgs = {
  id: Scalars["ID"];
};
export declare type MutationCreateCategoryArgs = {
  input?: Maybe<CreateCategory>;
};
export declare type MutationUpdateCategoryArgs = {
  input?: Maybe<UpdateCategory>;
};
export declare type MutationVerifyCheckoutArgs = {
  input?: Maybe<CheckoutVerificationInput>;
};
export declare type MutationCreateCouponArgs = {
  input?: Maybe<CouponInput>;
};
export declare type MutationUpdateCouponArgs = {
  id: Scalars["ID"];
  input?: Maybe<CouponUpdateInput>;
};
export declare type MutationDeleteCouponArgs = {
  id: Scalars["ID"];
};
export declare type MutationRestoreCouponArgs = {
  id: Scalars["ID"];
};
export declare type MutationDeleteOrderArgs = {
  id: Scalars["ID"];
};
export declare type MutationUpdateOrderArgs = {
  input?: Maybe<UpdateOrder>;
};
export declare type MutationCreateOrderArgs = {
  input?: Maybe<CreateOrder>;
};
export declare type MutationCreateOrderStatusArgs = {
  input?: Maybe<OrderStatusInput>;
};
export declare type MutationUpdateOrderStatusArgs = {
  input?: Maybe<OrderStatusUpdateInput>;
};
export declare type MutationDeleteOrderStatusArgs = {
  id: Scalars["ID"];
};
export declare type MutationDeleteProductArgs = {
  id: Scalars["ID"];
};
export declare type MutationCreateProductArgs = {
  input?: Maybe<CreateProduct>;
};
export declare type MutationUpdateProductArgs = {
  input?: Maybe<UpdateProduct>;
};
export declare type MutationCreateProfileArgs = {
  input?: Maybe<ProfileInput>;
};
export declare type MutationUpdateProfileArgs = {
  id: Scalars["ID"];
  input?: Maybe<ProfileInput>;
};
export declare type MutationDeleteProfileArgs = {
  id: Scalars["ID"];
};
export declare type MutationUpdateSettingsArgs = {
  input: SettingsInput;
};
export declare type MutationDeleteTypeArgs = {
  id: Scalars["ID"];
};
export declare type MutationCreateorUpdateTypeArgs = {
  id?: Maybe<Scalars["ID"]>;
  name: Scalars["String"];
};
export declare type MutationTokenArgs = {
  input?: Maybe<LoginInput>;
};
export declare type MutationRegisterArgs = {
  input?: Maybe<RegisterInput>;
};
export declare type AddressInput = {
  title: Scalars["String"];
  default?: Maybe<Scalars["Boolean"]>;
  address: UserAddressInput;
  type: Scalars["String"];
  customer?: Maybe<ConnectBelongsTo>;
};
export declare type UserAddressInput = {
  country?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  state?: Maybe<Scalars["String"]>;
  zip?: Maybe<Scalars["String"]>;
};
export declare type ConnectBelongsTo = {
  connect?: Maybe<Scalars["ID"]>;
};
export declare type AttributeInput = {
  name: Scalars["String"];
};
export declare type AttributeValueCreateInput = {
  value: Scalars["String"];
  attribute?: Maybe<AttributeBelongTo>;
};
export declare type AttributeBelongTo = {
  connect: Scalars["ID"];
};
export declare type AttributeValueUpdateInput = {
  id: Scalars["ID"];
  value?: Maybe<Scalars["String"]>;
  attribute?: Maybe<AttributeBelongTo>;
};
export declare type CreateCategory = {
  name: Scalars["String"];
  type_id?: Maybe<Scalars["ID"]>;
  parent?: Maybe<Scalars["Int"]>;
  details?: Maybe<Scalars["String"]>;
  image?: Maybe<AttachmentInput>;
  icon?: Maybe<Scalars["String"]>;
};
export declare type ConnectTypeBelongsTo = {
  connect?: Maybe<Scalars["ID"]>;
};
export declare type AttachmentInput = {
  thumbnail?: Maybe<Scalars["String"]>;
  original?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
};
export declare type UpdateCategory = {
  name?: Maybe<Scalars["String"]>;
  type_id?: Maybe<Scalars["ID"]>;
  parent?: Maybe<Scalars["Int"]>;
  details?: Maybe<Scalars["String"]>;
  image?: Maybe<AttachmentInput>;
  icon?: Maybe<Scalars["String"]>;
};
export declare type CheckoutVerificationInput = {
  amount: Scalars["Float"];
  products: Array<ConnectProductOrderPivot>;
  billing_address?: Maybe<UserAddressInput>;
  shipping_address?: Maybe<UserAddressInput>;
};
export declare type ConnectProductOrderPivot = {
  product_id: Scalars["ID"];
  order_quantity?: Maybe<Scalars["Int"]>;
  unit_price?: Maybe<Scalars["Float"]>;
  subtotal?: Maybe<Scalars["Float"]>;
};
export declare type VerifiedCheckoutdata = {
  total_tax: Scalars["Float"];
  shipping_charge: Scalars["Float"];
  unavailable_products: Array<Scalars["ID"]>;
};
export declare type CouponInput = {
  code: Scalars["String"];
  type: CouponType;
  amount: Scalars["Float"];
  description?: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["String"]>;
  active_from: Scalars["DateTime"];
  expire_at: Scalars["DateTime"];
};
export enum CouponType {
  /** Fixed coupon */
  FixedCoupon = "FIXED_COUPON",
  /** Percentage coupon */
  PercentageCoupon = "PERCENTAGE_COUPON",
  /** Free shipping coupon */
  FreeShippingCoupon = "FREE_SHIPPING_COUPON",
}
export declare type CouponUpdateInput = {
  code?: Maybe<Scalars["String"]>;
  type?: Maybe<CouponType>;
  amount?: Maybe<Scalars["Float"]>;
  description?: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["String"]>;
  active_from?: Maybe<Scalars["DateTime"]>;
  expire_at?: Maybe<Scalars["DateTime"]>;
};
export declare type UpdateOrder = {
  tracking_number?: Maybe<Scalars["String"]>;
  customer_id?: Maybe<Scalars["ID"]>;
  status?: Maybe<Scalars["ID"]>;
  products?: Array<ConnectProductOrderPivot>;
  amount?: Maybe<Scalars["Float"]>;
  sales_tax?: Maybe<Scalars["Float"]>;
  total?: Maybe<Scalars["Float"]>;
  paid_total?: Maybe<Scalars["Float"]>;
  payment_id?: Maybe<Scalars["String"]>;
  payment_gateway?: Maybe<Scalars["String"]>;
  coupon_id?: Maybe<Scalars["ID"]>;
  discount?: Maybe<Scalars["Float"]>;
  delivery_fee?: Maybe<Scalars["Float"]>;
  delivery_time?: Maybe<Scalars["String"]>;
  billing_address?: Maybe<UserAddressInput>;
  shipping_address?: Maybe<UserAddressInput>;
};
export declare type ConnectCustomerBelongsTo = {
  connect: Scalars["ID"];
};
export declare type ConnectOrderStatusBelongsTo = {
  connect: Scalars["ID"];
};
export declare type SyncProductOrderBelongsToMany = {
  sync?: Maybe<Array<ConnectProductOrderPivot>>;
};
export declare type ConnectCouponBelongsTo = {
  connect: Scalars["ID"];
};
export declare type CreateOrder = {
  tracking_number: Scalars["String"];
  customer_id: Scalars["Int"];
  status: Scalars["Int"];
  products: Array<ConnectProductOrderPivot>;
  amount: Scalars["Float"];
  sales_tax?: Maybe<Scalars["Float"]>;
  total: Scalars["Float"];
  paid_total: Scalars["Float"];
  payment_id?: Maybe<Scalars["String"]>;
  payment_gateway: Scalars["String"];
  coupon_id?: Maybe<Scalars["Int"]>;
  discount?: Maybe<Scalars["Float"]>;
  delivery_fee?: Maybe<Scalars["Float"]>;
  delivery_time: Scalars["String"];
  card?: Maybe<CardInput>;
  billing_address?: Maybe<UserAddressInput>;
  shipping_address?: Maybe<UserAddressInput>;
};
export declare type CardInput = {
  number: Scalars["String"];
  expiryMonth: Scalars["String"];
  expiryYear: Scalars["String"];
  cvv: Scalars["String"];
  email?: Maybe<Scalars["String"]>;
};
export declare type OrderStatusInput = {
  name: Scalars["String"];
  is_default?: Maybe<Scalars["Boolean"]>;
};
export declare type OrderStatusUpdateInput = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  is_default?: Maybe<Scalars["Boolean"]>;
};
export declare type CreateProduct = {
  name: Scalars["String"];
  type_id: Scalars["Int"];
  price: Scalars["Float"];
  sale_price?: Maybe<Scalars["Float"]>;
  quantity: Scalars["Int"];
  unit: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  categories?: Maybe<Array<Scalars["ID"]>>;
  variations?: Maybe<Array<AttributeProductPivot>>;
  in_stock?: Maybe<Scalars["Boolean"]>;
  is_taxable?: Maybe<Scalars["Boolean"]>;
  sku?: Maybe<Scalars["String"]>;
  gallery?: Maybe<Array<Maybe<AttachmentInput>>>;
  image?: Maybe<AttachmentInput>;
  status?: Maybe<ProductStatus>;
  height?: Maybe<Scalars["String"]>;
  length?: Maybe<Scalars["String"]>;
  width?: Maybe<Scalars["String"]>;
};
export declare type SyncCategoryBelongsToMany = {
  sync?: Maybe<Array<Scalars["ID"]>>;
};
export declare type SyncAttributeBelongsToMany = {
  sync: Array<AttributeProductPivot>;
};
export declare type AttributeProductPivot = {
  id: Scalars["ID"];
  price?: Maybe<Scalars["Float"]>;
};
export declare type UpdateProduct = {
  name: Scalars["String"];
  type_id: Scalars["Int"];
  price: Scalars["Float"];
  sale_price?: Maybe<Scalars["Float"]>;
  quantity: Scalars["Int"];
  unit: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  categories?: Maybe<Array<Scalars["ID"]>>;
  variations?: Maybe<Array<AttributeProductPivot>>;
  in_stock?: Maybe<Scalars["Boolean"]>;
  is_taxable?: Maybe<Scalars["Boolean"]>;
  sku?: Maybe<Scalars["String"]>;
  gallery?: Maybe<Array<Maybe<AttachmentInput>>>;
  image?: Maybe<AttachmentInput>;
  status?: Maybe<ProductStatus>;
  height?: Maybe<Scalars["String"]>;
  length?: Maybe<Scalars["String"]>;
  width?: Maybe<Scalars["String"]>;
};
export declare type ProfileInput = {
  avatar?: Maybe<Scalars["String"]>;
  bio?: Maybe<Scalars["String"]>;
  socials?: Maybe<Array<Maybe<SoicalInput>>>;
  contact?: Maybe<Scalars["String"]>;
  customer?: Maybe<ConnectBelongsTo>;
};
export declare type SoicalInput = {
  type?: Maybe<Scalars["String"]>;
  link?: Maybe<Scalars["String"]>;
};
export declare type SettingsInput = {
  options: Scalars["String"];
};
export declare type LoginInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};
export declare type RegisterInput = {
  email: Scalars["String"];
  password: Scalars["String"];
  name: Scalars["String"];
};

export type ChangePasswordInput = {
  oldPassword: Scalars["String"];
  newPassword: Scalars["String"];
};

export type PasswordChangeResponse = {
  message?: Maybe<Scalars["String"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type ForgetPasswordInput = {
  email: Scalars["String"];
};

export type VerifyForgetPasswordTokenInput = {
  token: Scalars["String"];
  email: Scalars["String"];
};

export type ResetPasswordInput = {
  token: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};
export enum Permission {
  /** Super admin */
  SuperAdmin = "SUPER_ADMIN",
  /** Store owner */
  StoreOwner = "STORE_OWNER",
  /** Store keeper */
  StoreKeeper = "STORE_KEEPER",
  /** Customer */
  Customer = "CUSTOMER",
}
/** Pagination information about the corresponding list of items. */
export declare type PageInfo = {
  __typename?: "PageInfo";
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars["Boolean"];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars["Boolean"];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars["String"]>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars["String"]>;
  /** Total number of node in connection. */
  total?: Maybe<Scalars["Int"]>;
  /** Count of nodes in current request. */
  count?: Maybe<Scalars["Int"]>;
  /** Current page of request. */
  currentPage?: Maybe<Scalars["Int"]>;
  /** Last page in connection. */
  lastPage?: Maybe<Scalars["Int"]>;
};
/** Allows ordering a list of records. */
export declare type OrderByClause = {
  /** The column that is used for ordering. */
  field: Scalars["String"];
  /** The direction that is used for ordering. */
  order: SortOrder;
};
/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = "ONLY",
  /** Return both trashed and non-trashed results. */
  With = "WITH",
  /** Only return non-trashed results. */
  Without = "WITHOUT",
}
/** Dynamic WHERE conditions for queries. */
export declare type WhereConditions = {
  /** The column that is used for the condition. */
  column?: Maybe<Scalars["String"]>;
  /** The operator that is used for the condition. */
  operator?: Maybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: Maybe<Scalars["Mixed"]>;
  /** A set of conditions that requires all conditions to match. */
  AND?: Maybe<Array<WhereConditions>>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: Maybe<Array<WhereConditions>>;
};
export declare type ProductsQueryVariables = Exact<{
  orderBy?: Maybe<Array<ProductsOrderByOrderByClause>>;
  text?: Maybe<Scalars["String"]>;
  status?: Maybe<Scalars["String"]>;
  hasType?: Maybe<ProductsHasTypeWhereConditions>;
  hasCategories?: Maybe<ProductsHasCategoriesWhereConditions>;
  first?: Maybe<Scalars["Int"]>;
  page?: Maybe<Scalars["Int"]>;
}>;

export type UpdateUser = {
  name?: Maybe<Scalars["String"]>;
  profile?: Maybe<UserProfileInput>;
  address?: Maybe<Array<Maybe<UserAddressUpsertInput>>>;
};
export type CreateUser = {
  name?: Maybe<Scalars["String"]>;
  email: Scalars["String"];
  password: Scalars["String"];
  profile?: Maybe<UserProfileInput>;
  address?: Maybe<Array<Maybe<UserAddressUpsertInput>>>;
};

export type SocialInput = {
  type?: Maybe<Scalars["String"]>;
  link?: Maybe<Scalars["String"]>;
};

export type UserProfileInput = {
  avatar?: Maybe<AttachmentInput>;
  bio?: Maybe<Scalars["String"]>;
  socials?: Maybe<Array<Maybe<SocialInput>>>;
  contact?: Maybe<Scalars["String"]>;
};

export type UserAddressUpsertInput = {
  title: Scalars["String"];
  default?: Maybe<Scalars["Boolean"]>;
  address: UserAddressInput;
  type: Scalars["String"];
};

export declare type Analytics = {
  totalRevenue?: Maybe<Scalars["Float"]>;
  todaysRevenue?: Maybe<Scalars["Float"]>;
  totalorders?: Maybe<Scalars["Int"]>;
  newCustomers?: Maybe<Scalars["Int"]>;
  totalYearSaleByMonth?: Maybe<Array<Maybe<TotalYearSaleByMonth>>>;
};
export declare type TotalYearSaleByMonth = {
  total?: Maybe<Scalars["Float"]>;
  month?: Maybe<Scalars["String"]>;
};
// export declare type ProductsQuery = {
//   __typename?: "Query";
// } & {
//   products?: Maybe<
//     {
//       __typename?: "ProductPaginator";
//     } & {
//       data: Array<
//         {
//           __typename?: "Product";
//         } & Pick<
//           Product,
//           | "id"
//           | "sku"
//           | "slug"
//           | "name"
//           | "description"
//           | "price"
//           | "quantity"
//           | "unit"
//         > & {
//             image?: Maybe<
//               {
//                 __typename?: "Attachment";
//               } & Pick<Attachment, "id" | "thumbnail" | "original">
//             >;
//             gallery?: Maybe<
//               Array<
//                 Maybe<
//                   {
//                     __typename?: "Attachment";
//                   } & Pick<Attachment, "id" | "thumbnail" | "original">
//                 >
//               >
//             >;
//           }
//       >;
//       paginatorInfo: {
//         __typename?: "PaginatorInfo";
//       } & Pick<PaginatorInfo, "hasMorePages">;
//     }
//   >;
// };
// export declare const ProductsDocument: Apollo.DocumentNode;
// /**
//  * __useProductsQuery__
//  *
//  * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
//  * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
//  * you can use to render your UI.
//  *
//  * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
//  *
//  * @example
//  * const { data, loading, error } = useProductsQuery({
//  *   variables: {
//  *      orderBy: // value for 'orderBy'
//  *      text: // value for 'text'
//  *      status: // value for 'status'
//  *      hasType: // value for 'hasType'
//  *      hasCategories: // value for 'hasCategories'
//  *      first: // value for 'first'
//  *      page: // value for 'page'
//  *   },
//  * });
//  */
// export declare function useProductsQuery(
//   baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>
// ): Apollo.QueryResult<
//   ProductsQuery,
//   Exact<{
//     orderBy?: ProductsOrderByOrderByClause[] | null | undefined;
//     text?: string | null | undefined;
//     status?: string | null | undefined;
//     hasType?: ProductsHasTypeWhereConditions | null | undefined;
//     hasCategories?: ProductsHasCategoriesWhereConditions | null | undefined;
//     first?: number | null | undefined;
//     page?: number | null | undefined;
//   }>
// >;
// export declare function useProductsLazyQuery(
//   baseOptions?: Apollo.LazyQueryHookOptions<
//     ProductsQuery,
//     ProductsQueryVariables
//   >
// ): Apollo.QueryTuple<
//   ProductsQuery,
//   Exact<{
//     orderBy?: ProductsOrderByOrderByClause[] | null | undefined;
//     text?: string | null | undefined;
//     status?: string | null | undefined;
//     hasType?: ProductsHasTypeWhereConditions | null | undefined;
//     hasCategories?: ProductsHasCategoriesWhereConditions | null | undefined;
//     first?: number | null | undefined;
//     page?: number | null | undefined;
//   }>
// >;
// export declare type ProductsQueryHookResult = ReturnType<
//   typeof useProductsQuery
// >;
// export declare type ProductsLazyQueryHookResult = ReturnType<
//   typeof useProductsLazyQuery
// >;
// export declare type ProductsQueryResult = Apollo.QueryResult<
//   ProductsQuery,
//   ProductsQueryVariables
// >;
