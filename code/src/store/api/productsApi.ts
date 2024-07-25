import { rtkQueryTags } from "@/constants/api-tags";
import { httpMethods } from "@/constants/methods";
import { URLS } from "@/constants/requests";
import { appApi } from "@/store/api/appApi";
import {
  CreateProductBody,
  GetManagerProductsParams,
  GetManagerProductsResponse,
  GetUserProductsParams,
  GetUserProductsResponse,
  Product
} from "@/types/product.types";
import createUrlPath from "@/utils/create-url-path/createUrlPath";

const productsApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getUserProducts: build.query<
      GetUserProductsResponse,
      GetUserProductsParams
    >({
      query: (params) => ({
        url: URLS.products.getForUser,
        params: params ?? {}
      }),
      providesTags: [rtkQueryTags.PRODUCTS]
    }),
    getManagerProducts: build.query<
      GetManagerProductsResponse,
      GetManagerProductsParams
    >({
      query: (params) => URLS.products.getForManager(params),
      providesTags: [rtkQueryTags.ADMIN_PRODUCTS]
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
    }),
    createProduct: build.mutation<void, CreateProductBody>({
      query: (body) => ({
        url: URLS.products.post,
        method: httpMethods.post,
        body
      }),
      invalidatesTags: [rtkQueryTags.ADMIN_PRODUCTS, rtkQueryTags.PRODUCTS]
    })
  })
});

export const {
  useGetUserProductsQuery,
  useGetManagerProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useCreateProductMutation
} = productsApi;
