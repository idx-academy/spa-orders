import { appApi } from "@/store/api/appApi";
import { httpMethods } from "@/constants/methods";
import { createUrlPath } from "@/utils/createUrlPath";
import { URLS } from "@/constants/requests";
import { Product } from "@/types/product.types";

const productsApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<Product[], void>({
      query: () => URLS.products.get
    }),
    addProduct: build.mutation<
      any,
      { name: string; description: string; price: number }
    >({
      query: (productData) => ({
        url: URLS.products.post,
        method: httpMethods.post,
        body: productData
      })
    }),
    deleteProduct: build.mutation<any, string>({
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
