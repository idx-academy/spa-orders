import { rtkQueryTags } from "@/constants/api-tags";
import { httpMethods } from "@/constants/methods";
import { URLS } from "@/constants/requests";
import { appApi } from "@/store/api/appApi";
import {
  CreateProductBody,
  GetManagerProductByIdParams,
  GetManagerProductByIdResponse,
  GetManagerProductsParams,
  GetManagerProductsResponse,
  GetUserProductByIdParams,
  GetUserProductByIdResponse,
  GetUserProductsBySearchQueryParams,
  GetUserProductsBySearchQueryResponse,
  GetUserProductsParams,
  GetUserProductsResponse,
  Product,
  UpdateProductBody
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
    getUserProductById: build.query<
      GetUserProductByIdResponse,
      GetUserProductByIdParams
    >({
      query: (params) => URLS.products.getForUserById(params),
      transformErrorResponse: (response) => {
        if (response.status !== 404) {
          response.isSnackbarHidden = false;
        }

        return response;
      },
      providesTags: [rtkQueryTags.PRODUCTS]
    }),
    getManagerProducts: build.query<
      GetManagerProductsResponse,
      GetManagerProductsParams
    >({
      query: (params) => ({
        url: URLS.products.getForManager,
        params
      }),
      providesTags: [rtkQueryTags.ADMIN_PRODUCTS]
    }),
    getManagerProduct: build.query<
      GetManagerProductByIdResponse,
      GetManagerProductByIdParams
    >({
      query: (params) => URLS.products.getForManagerById(params)
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
    }),
    GetUserProductsBySearch: build.query<
      GetUserProductsBySearchQueryResponse,
      GetUserProductsBySearchQueryParams
    >({
      query: (params) => URLS.products.searchByQuery(params)
    }),
    updateProduct: build.mutation<void, UpdateProductBody>({
      query: ({ productId, ...body }) => ({
        url: URLS.products.patch({ productId }),
        method: httpMethods.patch,
        body
      }),
      invalidatesTags: [rtkQueryTags.ADMIN_PRODUCTS, rtkQueryTags.PRODUCTS]
    })
  })
});
export const {
  useGetUserProductsQuery,
  useGetUserProductByIdQuery,
  useGetManagerProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useCreateProductMutation,
  useGetManagerProductQuery,
  useGetUserProductsBySearchQuery,
  useUpdateProductMutation
} = productsApi;
