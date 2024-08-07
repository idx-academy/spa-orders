import { rtkQueryTags } from "@/constants/api-tags";
import { httpMethods } from "@/constants/methods";
import { URLS } from "@/constants/requests";
import { appApi } from "@/store/api/appApi";
import {
  CartManagementDeleteParams,
  CartManagementGetParams,
  CartManagementPatchParams,
  CartManagementPostParams,
  CartType
} from "@/types/cart.types";

const cartApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getCartItems: build.query<CartType, CartManagementGetParams>({
      query: (params) => ({
        url: URLS.cart.get(params)
      }),
      providesTags: [rtkQueryTags.CART]
    }),
    addToCart: build.mutation<void, CartManagementPostParams>({
      query: (args) => ({
        url: URLS.cart.post(args),
        method: httpMethods.post
      }),
      invalidatesTags: [rtkQueryTags.CART]
    }),
    removeFromCart: build.mutation<void, CartManagementDeleteParams>({
      query: (args) => ({
        url: URLS.cart.delete(args),
        method: httpMethods.delete
      }),
      invalidatesTags: [rtkQueryTags.CART]
    }),
    updateCartItemQuantity: build.mutation<void, CartManagementPatchParams>({
      query: ({ userId, productId, quantity }) => ({
        url: URLS.cart.patchQuantity({ userId, productId, quantity }),
        method: httpMethods.patch
      }),
      invalidatesTags: [rtkQueryTags.CART],
      transformErrorResponse: (value) => {
        value.isSnackbarHidden = true;

        return value;
      }
    })
  })
});

export const {
  useGetCartItemsQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartItemQuantityMutation,
  useLazyGetCartItemsQuery
} = cartApi;

export default cartApi;
