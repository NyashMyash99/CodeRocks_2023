import { createApi } from "@reduxjs/toolkit/query/react";
import { AuthModel, TokenModel } from "../../utils/models/auth.models";
import {
  configureBackendBaseQuery,
  configureErrorTransformer,
} from "../../utils/helpers/api.helpers";

export const authApi = createApi({
  reducerPath: "auth/api",
  baseQuery: configureBackendBaseQuery("/auth/"),
  endpoints: (build) => ({
    authorize: build.query<TokenModel, AuthModel>({
      query: (credentials: AuthModel) => ({
        url: "",
        method: "POST",
        body: credentials,
      }),
      transformErrorResponse: configureErrorTransformer,
    }),
  }),
});

export const { useLazyAuthorizeQuery } = authApi;
