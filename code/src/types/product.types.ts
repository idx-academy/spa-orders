import { ProductTranslation } from "@/containers/forms/new-product-form/NewProductForm.types";

import { Lang, Pageable, PageableResponse } from "@/types/common";

export type ProductStatus = "AVAILABLE";

export type Product = {
  id: string;
  name: string;
  description: string;
  status: ProductStatus;
  tags: string[];
  image: string;
  price: number;
};

export type ManagerProductStatus = "VISIBLE" | "HIDDEN";

export type ManagerProduct = {
  id: string;
  name: string;
  description: string;
  imageLink: string;
  quantity: number;
  price: number;
  createdAt: string;
  status: ManagerProductStatus;
  tags: string[];
};

export type GetUserProductsResponse = {
  content: Product[];
  totalPages: number;
  totalElements: number;
};

export type GetUserProductsParams = Lang & {
  page?: number;
  size?: number;
  sort?: string;
};

export type GetUserProductByIdResponse = Pick<
  Product,
  "image" | "price" | "tags" | "name" | "description"
> & {
  quantity: number;
};

export type GetUserProductByIdParams = Lang & {
  productId: string;
};

export type GetManagerProductsResponse = PageableResponse<ManagerProduct[]>;

export type GetManagerProductsParams = Partial<Pageable & Lang>;

export type CreateProductBody = {
  status: ManagerProductStatus;
  tagIds: number[];
  image: string;
  price: number;
  quantity: number;
  productTranslations: ProductTranslation[];
};

export type ManagerProductTag = {
  id: number;
  name: string;
};

export type GetManagerProductByIdResponse = {
  id: string;
  status: ManagerProductStatus;
  image: string;
  createdAt: string;
  quantity: number;
  price: number;
  tags: ManagerProductTag[];
  productTranslations: ProductTranslation[];
};

export type GetManagerProductByIdParams = {
  productId: string;
};
