import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sliceNames } from "@/store/constants";
import { LOCAL_STORAGE_KEYS } from "@/constants/common";
import { useAppSelector } from "@/hooks/use-redux/useRedux";
import { UserDetails } from "@/types/user.types";
import checkJWTTokenExpiration from "@/utils/check-jwt-token-expiration/checkJWTTokenExpiration";

type UserState = {
  userDetails: UserDetails | null;
};

const initialState: UserState = {
  userDetails: null
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

      const isTokenExpired = checkJWTTokenExpiration(userDetails.token);

      if (isTokenExpired) {
        throw new Error("Token expired");
      }

      dispatch(authenticate(userDetails));
      return null;
    } catch (error) {
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
  }
});

export const { authenticate, logout } = userSlice.actions;

export const useIsAuthSelector = () =>
  useAppSelector((store) => store.user.userDetails !== null);
export const useUserDetailsSelector = () =>
  useAppSelector((store) => store.user.userDetails);

export default userSlice.reducer;
