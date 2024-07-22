import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

import { LOCAL_STORAGE_KEYS } from "@/constants/common";
import { useAppSelector } from "@/hooks/use-redux/useRedux";
import { sliceNames } from "@/store/constants";
import { TokenPayload, UserDetails, UserFromServer } from "@/types/user.types";
import checkJWTExpiration from "@/utils/check-jwt-expiration/checkJWTExpiration";

type UserState = {
  userDetails: UserDetails | null;
  isLoading: boolean;
  isFirstSessionAfterAuth: boolean;
};

type AuthenticatePayload = {
  token: string;
  isFirstSessionAfterAuth: boolean;
};

const initialState: UserState = {
  userDetails: null,
  isLoading: true,
  isFirstSessionAfterAuth: false
};

export const checkAuth = createAsyncThunk(
  `${sliceNames.user}/checkAuth`,
  (_, { dispatch, rejectWithValue }) => {
    try {
      const serializedUserDetails = window.localStorage.getItem(
        LOCAL_STORAGE_KEYS.userDetails
      );

      if (!serializedUserDetails) {
        throw new Error("No user details");
      }

      const tokenPayload = JSON.parse(serializedUserDetails) as TokenPayload;

      if (!("token" in tokenPayload)) {
        throw new Error("No token");
      }

      const token = tokenPayload.token;

      const isTokenExpired = checkJWTExpiration(token);

      if (isTokenExpired) {
        throw new Error("Token expired");
      }

      dispatch(authenticate({ token, isFirstSessionAfterAuth: false }));
      return null;
    } catch {
      dispatch(logout());
      return rejectWithValue({ isSnackbarHidden: true });
    }
  }
);

const userSlice = createSlice({
  name: sliceNames.user,
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<AuthenticatePayload>) => {
      const token = action.payload.token;
      const user = jwtDecode<UserFromServer>(token);

      const userDetails: UserDetails = {
        token,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.sub,
        role: user.scope
      };

      state.userDetails = userDetails;
      state.isFirstSessionAfterAuth = action.payload.isFirstSessionAfterAuth;

      const serializedUserDetails = JSON.stringify(userDetails);
      window.localStorage.setItem(
        LOCAL_STORAGE_KEYS.userDetails,
        serializedUserDetails
      );
    },
    logout: (state) => {
      state.userDetails = null;
      window.localStorage.removeItem(LOCAL_STORAGE_KEYS.userDetails);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { authenticate, logout } = userSlice.actions;

export const useIsAuthSelector = () =>
  useAppSelector((store) => store.user.userDetails !== null);

export const useIsAuthLoadingSelector = () =>
  useAppSelector((store) => store.user.isLoading);

export const useUserDetailsSelector = () =>
  useAppSelector((store) => store.user.userDetails);

export const useIsFirstSessionAfterAuthSelector = () =>
  useAppSelector((store) => store.user.isFirstSessionAfterAuth);

export const useUserRoleSelector = () =>
  useAppSelector((store) => {
    const userDetails = store.user.userDetails;
    if (userDetails === null) {
      return null;
    }
    return userDetails.role;
  });

export default userSlice.reducer;
