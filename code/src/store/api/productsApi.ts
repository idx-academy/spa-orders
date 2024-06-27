import { appApi } from "@/store/api/appApi";

import { createUrlPath } from "@/utils/createUrlPath";
import { httpMethods } from "@/constants/methods";
import { URLS } from "@/constants/requests";

import { Product } from "@/types/product.types";

type GetProductsResponse = { items: Product[]; pagesCount: number };

type GetProductsParams = {
  page?: number;
};

const productsApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<
      GetProductsResponse,
      GetProductsParams | undefined | void
    >({
      query: (params = {}) => ({
        url: URLS.products.get,
        params: params
      })
    }),
    addProduct: build.mutation<
      Product,
      Pick<Product, "name" | "description" | "price">
    >({
      query: (productData) => ({
        url: URLS.products.post,
        method: httpMethods.post,
        body: productData
      })
    }),
    deleteProduct: build.mutation<Product, string>({
      query: (id: string) => ({
        url: createUrlPath(URLS.products.delete, id),
        method: httpMethods.delete
      })
    })
  })
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation
} = productsApi;
