import { bindActionCreators } from "@reduxjs/toolkit";
import { store } from "../store";
import { ApiMiddleware } from "../../utils/helpers/api.helpers";
import { APPLICATION_ACTIONS } from "../../hooks/actions.hook";
import { toastError } from "../../utils/helpers/toast.helpers";
import { scrollTo } from "../../utils/helpers/scroll.helpers";

export const unauthorizedMiddleware: ApiMiddleware = (result) => {
  if (!result.error || result.error.status !== 401) return result;

  const { logoutSuccess } = bindActionCreators(
    APPLICATION_ACTIONS,
    store.dispatch
  );

  toastError("Ваша сессия устарела, авторизуйтесь заново, пожалуйста.");
  logoutSuccess();
  scrollTo("AUTH");
};
