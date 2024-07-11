import { httpMethods } from "@/constants/methods";
import { URLS } from "@/constants/requests";
import { appApi } from "@/store/api/appApi";
import {
  SignInCredentials,
  SignInResponse,
  SignUpCredentials,
  SignUpResponse
} from "@/types/auth.types";

const authApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<SignUpResponse, SignUpCredentials>({
      query: (credentials) => ({
        url: URLS.auth.signUp,
        method: httpMethods.post,
        body: credentials
      })
    }),
    signIn: build.mutation<SignInResponse, SignInCredentials>({
      query: (credentials) => ({
        url: URLS.auth.signIn,
        method: httpMethods.post,
        body: credentials
      })
    })
  })
});

export const { useSignUpMutation, useSignInMutation } = authApi;
