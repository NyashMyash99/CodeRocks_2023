import { useAuthState } from "../../store/auth/auth.slice";
import { scrollTo } from "../../utils/helpers/scroll.helpers";
import { useUpdateEffect } from "react-use";
import React from "react";
import { Button } from "../form/buttons/Button";
import { FaList, FaPlusSquare, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useActions } from "../../hooks/actions.hook";
import { useRouter } from "next/router";

export const MenuSection = () => {
  const { isAuthenticated, isFilled } = useAuthState();
  const { logoutSuccess } = useActions();
  const router = useRouter();

  useUpdateEffect(() => {
    if (isFilled || !isAuthenticated) return;
    // Если пользователь ещё не заполнил данные - прокручиваем на страницу профиля.
    scrollTo("PROFILE");
  }, [isFilled]);

  const handleLogout = () => {
    logoutSuccess();
    // Если пользователь вышел из аккаунта - прокручиваем на страницу авторизации.
    scrollTo("LOGO");
  };

  return (
    <section className="landing-section">
      <h1>Навигация</h1>

      <nav className="flex gap-8">
        <div className="flex flex-col gap-2 text-center">
          <Button
            className="bg-white-opacity py-8 m-auto"
            width="fit"
            variant="outline"
            onClick={() => scrollTo("PROFILE")}
          >
            <FaUser />
          </Button>

          <small className="font-semibold">Профиль</small>
        </div>

        <div className="flex flex-col gap-2 text-center">
          <Button
            className="bg-white-opacity py-8 m-auto"
            width="fit"
            variant="outline"
            onClick={() => router.push("order")}
          >
            <FaPlusSquare />
          </Button>

          <small className="font-semibold">Найти профи</small>
        </div>

        <div className="flex flex-col gap-2 text-center">
          <Button
            className="bg-white-opacity py-8 m-auto"
            width="fit"
            variant="outline"
            onClick={() => router.push("orders")}
          >
            <FaList />
          </Button>

          <small className="font-semibold">Список заказов</small>
        </div>

        <div className="flex flex-col gap-2 text-center">
          <Button
            className="bg-white-opacity py-8 m-auto"
            width="fit"
            variant="outline"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
          </Button>

          <small className="font-semibold">Выйти из аккаунта</small>
        </div>
      </nav>
    </section>
  );
};
