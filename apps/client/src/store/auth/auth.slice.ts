import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { nextLocalStorage } from "../../utils/helpers/next.helpers";

export const hasAccessToken = () => !!nextLocalStorage()?.getItem("token");
export const getAccessToken = () => nextLocalStorage()?.getItem("token");

interface AuthState {
  isAuthenticated: boolean;
  isFilled: boolean;
  token: string | null;
}

interface SuccessLogin {
  token: NonNullable<AuthState["token"]>;
  remember?: boolean;
}

const initialState: AuthState = {
  isAuthenticated: hasAccessToken(),
  isFilled: false,
  token: getAccessToken() || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      { payload: { token } }: PayloadAction<SuccessLogin>
    ) => {
      state.isAuthenticated = true;
      state.token = token;

      localStorage.setItem("token", token);
    },
    filledSuccess: (state) => {
      state.isFilled = true;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.isFilled = false;
      state.token = null;

      localStorage.removeItem("token");
    },
  },
});

export const useAuthState = () => useSelector((state: RootState) => state.auth);
export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
export const authReducerPath = authSlice.name;
