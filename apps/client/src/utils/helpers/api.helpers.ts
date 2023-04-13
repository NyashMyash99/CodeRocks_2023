import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store/store";
import {
  ErrorModel,
  NestErrorModel,
  ValidationErrorModel,
} from "../models/request.models";

export type ApiMiddleware = (
  result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
) => void;

export const configureBackendBaseQuery = (
  endpoint: string,
  middlewares: ApiMiddleware[] = []
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  const baseQuery = fetchBaseQuery({
    baseUrl: `http://localhost:5200/api${endpoint}`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);

      return headers;
    },
  });

  return async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    for (const middleware of middlewares) await middleware(result);

    return result;
  };
};

export const configureErrorTransformer = (
  response: FetchBaseQueryError
): ErrorModel => {
  const data = response.data as NestErrorModel | ValidationErrorModel;

  return {
    message:
      (Array.isArray(data.message) ? data.message : [data.message]) || [],
    statusCode: data.statusCode || (response.status as number) || 500,
  };
};
