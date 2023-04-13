import { bindActionCreators } from "@reduxjs/toolkit";
import { store } from "../store";
import { ApiMiddleware } from "../../utils/helpers/api.helpers";
import { APPLICATION_ACTIONS } from "../../hooks/actions.hook";
import { authReducerPath } from "../auth/auth.slice";

export const refreshTokenMiddleware: ApiMiddleware = (result) => {
  const headers = result.meta?.response?.headers;
  if (!headers?.has("X-Access-Token")) return;

  const accessToken = headers?.get("X-Access-Token") || "";
  if (store.getState()[authReducerPath].token === accessToken) return;

  const { loginSuccess } = bindActionCreators(
    APPLICATION_ACTIONS,
    store.dispatch
  );

  loginSuccess({ token: accessToken });
};
