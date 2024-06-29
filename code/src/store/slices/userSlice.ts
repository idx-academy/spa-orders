import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sliceNames } from "@/store/constants";
import { LOCAL_STORAGE_KEYS } from "@/constants/common";
import { SignInResponse, SignUpResponse } from "@/types/auth.types";
import { useAppSelector } from "@/hooks/use-redux/useRedux";

type UserDetails = SignUpResponse | SignInResponse;

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
        throw new Error("Forbidden");
      }

      const userDetails = JSON.parse(serializedUserDetails);
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
  }
});

export const { authenticate, logout } = userSlice.actions;

export const useIsAuthSelector = () =>
  useAppSelector((store) => store.user.userDetails !== null);
export const useUserDetailsSelector = () =>
  useAppSelector((store) => store.user.userDetails);

export default userSlice.reducer;
