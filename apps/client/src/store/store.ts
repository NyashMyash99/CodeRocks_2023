import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./auth/auth.api";
import { usersApi } from "./users/users.api";
import { authReducer, authReducerPath } from "./auth/auth.slice";
import { formReducer, formReducerPath } from "./form/form.slice";
import { ordersApi } from "./orders/orders.api";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [authReducerPath]: authReducer,
    [formReducerPath]: formReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      usersApi.middleware,
      ordersApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
