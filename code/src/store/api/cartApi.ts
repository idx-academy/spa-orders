import { rtkQueryTags } from "@/constants/api-tags";
import { httpMethods } from "@/constants/methods";
import { URLS } from "@/constants/requests";
import { appApi } from "@/store/api/appApi";
import { CartManagementParams } from "@/types/cart.types";

const cartApi = appApi.injectEndpoints({
  endpoints: (build) => ({
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

export const { useAddToCartMutation, useRemoveFromCartMutation } = cartApi;
