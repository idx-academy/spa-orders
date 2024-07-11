import { rtkQueryTags } from "@/constants/api-tags";
import { httpMethods } from "@/constants/methods";
import { URLS } from "@/constants/requests";
import { appApi } from "@/store/api/appApi";
import { CartManagementParams, CartType } from "@/types/cart.types";

const cartApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getCartItems: build.query<CartType, number>({
      query: (userId) => ({
        url: URLS.cart.get({ userId })
      }),
      providesTags: [rtkQueryTags.CART]
    }),
    addToCart: build.mutation<void, CartManagementParams>({
      query: (args) => ({
        url: URLS.cart.post(args),
        method: httpMethods.post
      }),
      invalidatesTags: [rtkQueryTags.CART]
    }),
    removeFromCart: build.mutation<void, CartManagementParams>({
      query: (args) => ({
        url: URLS.cart.delete(args),
        method: httpMethods.delete
      }),
      invalidatesTags: [rtkQueryTags.CART]
    })
  })
});

export const {
  useGetCartItemsQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation
} = cartApi;
