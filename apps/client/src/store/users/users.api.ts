import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { UpdateUserModel, UserModel } from "../../utils/models/users.models";
import {
  configureBackendBaseQuery,
  configureErrorTransformer,
} from "../../utils/helpers/api.helpers";
import { unauthorizedMiddleware } from "../middlewares/unauthorized.middleware";
import { refreshTokenMiddleware } from "../middlewares/refresh-token.middleware";

export const usersApi = createApi({
  reducerPath: "users/api",
  baseQuery: configureBackendBaseQuery("/users/", [
    unauthorizedMiddleware,
    refreshTokenMiddleware,
  ]),
  endpoints: (builder) => ({
    user: builder.query<UserModel, void>({
      query: () => "me",
      transformErrorResponse: configureErrorTransformer,
    }),
    findUser: builder.query<UserModel, string>({
      query: (id) => id,
      transformErrorResponse: configureErrorTransformer,
    }),
    updateUser: builder.query<void, UpdateUserModel>({
      query: (updateUserDto) => {
        const { userId, ...otherUpdateData } = updateUserDto;

        return {
          url: userId,
          method: "PUT",
          body: otherUpdateData,
        };
      },
      transformErrorResponse: configureErrorTransformer,
    }),
  }),
});

export const {
  useUserQuery,
  useLazyUserQuery,
  useFindUserQuery,
  useLazyFindUserQuery,
  useLazyUpdateUserQuery,
} = usersApi;
