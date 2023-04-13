import { FaEnvelope, FaLock } from "react-icons/fa";
import { TextInput } from "../form/inputs/TextInput";
import { PasswordInput } from "../form/inputs/PasswordInput";
import { Button } from "../form/buttons/Button";
import { useAuth } from "../../hooks/auth.hook";
import { AuthModel } from "../../utils/models/auth.models";
import { FormContainer } from "../form/FormContainer";
import { scrollTo } from "../../utils/helpers/scroll.helpers";
import { useState } from "react";

export const AuthorizationSection = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isFieldEmpty = !email || !password;

  const { handleAuth: handleAuthHook } = useAuth();
  const handleAuth = async (credentials: AuthModel) => {
    const isAuthenticated = await handleAuthHook(credentials);
    if (!isAuthenticated) return;
    // Если пользователь авторизовался - прокручиваем на страницу профиля.
    scrollTo("PROFILE");
  };

  return (
    <section className="landing-section">
      <FormContainer
        className="landing-form"
        onSuccess={handleAuth}
        validator={{
          email: [
            {
              pattern: /^\S+@\S+$/i,
              error:
                "Введённые данные должны соответствовать шаблону электронной почты",
            },
          ],
        }}
      >
        <h2 className="text-center pb-10">Присоединяйся!</h2>

        <TextInput
          startIcon={<FaEnvelope />}
          placeholder="your@gmail.com"
          name="email"
          type="email"
          onChange={setEmail}
          required
        />

        <PasswordInput
          startIcon={<FaLock />}
          placeholder="Пароль"
          name="password"
          onChange={setPassword}
          required
        />

        <Button disabled={isFieldEmpty}>Авторизоваться</Button>
      </FormContainer>

      <div className="landing-card">
        <div>
          <h2>1. Необходимо войти в аккаунт.</h2>
          <small>
            Регистрация производится автоматически при отсутствии аккаунта
          </small>
        </div>

        <h3>Всё быстро и просто!</h3>
      </div>
    </section>
  );
};
