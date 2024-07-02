import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sliceNames } from "@/store/constants";
import { LOCAL_STORAGE_KEYS } from "@/constants/common";
import { useAppSelector } from "@/hooks/use-redux/useRedux";
import { UserDetails } from "@/types/user.types";
import checkJWTExpiration from "@/utils/check-jwt-expiration/checkJWTExpiration";

type UserState = {
  userDetails: UserDetails | null;
  isLoading: boolean;
};

const initialState: UserState = {
  userDetails: null,
  isLoading: true
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

      const userDetails = JSON.parse(serializedUserDetails) as UserDetails;

      if (!("token" in userDetails)) {
        throw new Error("No token");
      }

      const isTokenExpired = checkJWTExpiration(userDetails.token);

      if (isTokenExpired) {
        throw new Error("Token expired");
      }

      dispatch(authenticate(userDetails));
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
    authenticate: (state, action: PayloadAction<UserDetails>) => {
      const userDetails = action.payload;
      state.userDetails = userDetails;

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
  useAppSelector((store) => ({
    isAuthenticated: store.user.userDetails !== null,
    isLoading: store.user.isLoading
  }));
export const useUserDetailsSelector = () =>
  useAppSelector((store) => store.user.userDetails);

export default userSlice.reducer;
