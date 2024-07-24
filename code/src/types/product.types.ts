import { ProductTranslation } from "@/containers/forms/new-product-form/NewProductForm.types";

import { Lang, Pageable } from "@/types/common";

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

export type GetManagerProductsResponse = {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  empty: boolean;
  content: ManagerProduct[];
};

export type GetManagerProductsParams = Partial<ManagerProduct & Pageable>;
export type CreateProductBody = {
  status: ManagerProductStatus;
  tagIds: number[];
  image: string;
  price: number;
  quantity: number;
  productTranslations: ProductTranslation[];
};
