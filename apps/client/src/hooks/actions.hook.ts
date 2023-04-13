import { bindActionCreators } from "@reduxjs/toolkit";
import { authActions } from "../store/auth/auth.slice";
import { formActions } from "../store/form/form.slice";
import { useDispatch } from "react-redux";

export const APPLICATION_ACTIONS = {
  ...authActions,
  ...formActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(APPLICATION_ACTIONS, dispatch);
};
