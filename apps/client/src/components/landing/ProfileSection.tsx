import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useAuthState } from "../../store/auth/auth.slice";
import {
  useLazyUpdateUserQuery,
  useLazyUserQuery,
} from "../../store/users/users.api";
import { FormContainer } from "../form/FormContainer";
import { TextInput } from "../form/inputs/TextInput";
import { Button } from "../form/buttons/Button";
import { TextArea } from "../form/inputs/TextArea";
import { useActions } from "../../hooks/actions.hook";
import { scrollTo } from "../../utils/helpers/scroll.helpers";
import { UpdateUserModel } from "../../utils/models/users.models";
import { toastError, toastSuccess } from "../../utils/helpers/toast.helpers";

export const ProfileSection = () => {
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const isFieldEmpty = !firstName || !lastName || !phone || !description;

  const { token, isAuthenticated, isFilled } = useAuthState();
  const { filledSuccess, logoutSuccess } = useActions();
  const [getUserData, { isLoading }] = useLazyUserQuery();
  useEffect(() => {
    if (!isAuthenticated) return;

    setUserId((jwtDecode(token || "") as any).userId);
    (async () => {
      const { isError, error, data } = await getUserData();

      if (isError) {
        // @ts-ignore
        toastError(error.message);
        return;
      }

      if (
        data?.profile?.firstName &&
        data?.profile?.lastName &&
        data?.phoneNumber &&
        data?.profile?.description
      ) {
        filledSuccess();
        scrollTo("MENU");
      }

      setFirstName(data?.profile?.firstName || "");
      setLastName(data?.profile?.lastName || "");
      setPhone(data?.phoneNumber || "");
      setDescription(data?.profile?.description || "");
    })();
  }, [isAuthenticated]);

  const [updateUser, { isLoading: isUserUpdatePending }] =
    useLazyUpdateUserQuery();
  const handleSubmit = async (data: UpdateUserModel) => {
    const { isError: isUserUpdateFailed, error: userUpdateError } =
      await updateUser(data);

    if (isUserUpdateFailed) {
      // @ts-ignore
      for (const message of userUpdateError.message as string[])
        toastError(message.capitalize());
      return;
    }

    filledSuccess();
    toastSuccess("Информация успешно обновлена!");
    // Если пользователь заполнил данные - прокручиваем на страницу меню.
    scrollTo("MENU");
  };

  const handleLogout = () => {
    logoutSuccess();
    // Если пользователь вышел из аккаунта - прокручиваем на страницу авторизации.
    scrollTo("AUTH");
  };

  return (
    <section className="landing-section">
      <div className="landing-card">
        {!isFilled ? (
          <>
            <div>
              <h2>2. Заполните профиль</h2>
              <small>Чтобы всем пользователям было удобно</small>
            </div>

            <h3>Вы в шаге от цели!</h3>

            <Button className="mt-4" onClick={handleLogout}>
              Выйти из аккаунта
            </Button>
          </>
        ) : (
          <>
            <div>
              <h2>Обновление данных профиля</h2>
              <small>Появилось что-то новенькое?</small>
            </div>

            <Button className="mt-4" onClick={() => scrollTo("MENU")}>
              Перейти к меню
            </Button>
          </>
        )}
      </div>

      <FormContainer
        className="landing-form"
        onSuccess={handleSubmit}
        validator={{
          phoneNumber: [
            {
              pattern: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i,
              error:
                "Введённые данные должны соответствовать шаблону номера телефона",
            },
          ],
        }}
      >
        <input name="userId" defaultValue={userId} hidden />

        <TextInput
          placeholder="Имя"
          name="firstName"
          defaultValue={firstName}
          onChange={setFirstName}
          required
        />

        <TextInput
          placeholder="Фамилия"
          name="lastName"
          defaultValue={lastName}
          onChange={setLastName}
          required
        />

        <TextInput
          placeholder="Номер телефона"
          name="phoneNumber"
          defaultValue={phone}
          onChange={setPhone}
          required
        />

        <TextArea
          placeholder="Расскажите о себе..."
          name="description"
          defaultValue={description}
          onChange={setDescription}
          required
        />

        <Button
          className="text-center"
          disabled={isLoading || isUserUpdatePending || isFieldEmpty}
        >
          Сохранить данные
        </Button>
      </FormContainer>
    </section>
  );
};
