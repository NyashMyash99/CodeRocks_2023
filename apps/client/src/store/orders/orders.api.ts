import { createApi } from "@reduxjs/toolkit/query/react";
import {
  configureBackendBaseQuery,
  configureErrorTransformer,
} from "../../utils/helpers/api.helpers";
import { OrderModel } from "../../utils/models/order.models";

export const ordersApi = createApi({
  reducerPath: "orders/api",
  baseQuery: configureBackendBaseQuery("/orders/"),
  endpoints: (build) => ({
    subscribeOrder: build.query<OrderModel, string>({
      query: (id: string) => ({
        url: `${id}/subscribe`,
        method: "POST",
      }),
      transformErrorResponse: configureErrorTransformer,
    }),
    createOrder: build.query<OrderModel, any>({
      query: (data: any) => ({
        url: "",
        method: "POST",
        body: data,
      }),
      transformErrorResponse: configureErrorTransformer,
    }),
    listOrders: build.query<OrderModel[], void>({
      query: () => "list",
      transformErrorResponse: configureErrorTransformer,
    }),
  }),
});

export const {
  useListOrdersQuery,
  useLazyListOrdersQuery,
  useLazyCreateOrderQuery,
  useLazySubscribeOrderQuery,
} = ordersApi;
