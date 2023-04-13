import { useCallback } from "react";
import { useActions } from "./actions.hook";
import { AuthModel } from "../utils/models/auth.models";
import { useLazyAuthorizeQuery } from "../store/auth/auth.api";
import { toastError } from "../utils/helpers/toast.helpers";

export const useAuth = () => {
  const { loginSuccess } = useActions();
  const [authorize] = useLazyAuthorizeQuery();

  const handleAuth = useCallback(
    async (credentials: AuthModel) => {
      const { isError, error, data } = await authorize(credentials);

      if (isError) {
        // @ts-ignore
        for (const message of error.message as string[])
          toastError(message?.capitalize());
        return false;
      }

      loginSuccess({ token: data!.access_token });
      return true;
    },
    [loginSuccess, authorize]
  );

  return {
    handleAuth,
  };
};
