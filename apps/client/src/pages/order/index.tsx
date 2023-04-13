import React, { useEffect } from "react";
import { useAuthState } from "../../store/auth/auth.slice";
import Router from "next/router";
import { FormContainer } from "../../components/form/FormContainer";
import { TextInput } from "../../components/form/inputs/TextInput";
import { Button } from "../../components/form/buttons/Button";
import { TextArea } from "../../components/form/inputs/TextArea";
import moment from "moment";
import { toastError } from "../../utils/helpers/toast.helpers";
import { useLazyCreateOrderQuery } from "../../store/orders/orders.api";

export default function Order() {
  const { isAuthenticated } = useAuthState();
  const [createOrder] = useLazyCreateOrderQuery();

  useEffect(() => {
    if (!isAuthenticated) return Router.back();
  }, [isAuthenticated]);

  const handleSubmit = async (data: any) => {
    const deadline = data.deadline;
    const monthRegex = /([0-9]+) месяц(ев)?/;
    const dayRegex = /([0-9]+) день|дней/;
    const hoursRegex = /([0-9]+) час(ов)?/;
    const minutesRegex = /([0-9]+) минут(а)?/;

    data.minPrice = +data.minPrice;
    data.maxPrice = +data.maxPrice;

    data.deadline = moment
      .duration({
        month: (monthRegex.exec(deadline) || [0, 0])[1] as number,
        day: (dayRegex.exec(deadline) || [0, 0])[1] as number,
        hour: (hoursRegex.exec(deadline) || [0, 0])[1] as number,
        minute: (minutesRegex.exec(deadline) || [0, 0])[1] as number,
      })
      .asMilliseconds();

    if (data.deadline === 0)
      return toastError(
        "Выделяемое время должно быть формата: 1 месяц 24 дня 6 часов 5 минут"
      );

    const { isError, error } = await createOrder(data);

    if (isError) {
      // @ts-ignore
      for (const message of error.message as string[])
        toastError(message.capitalize());
      return;
    }

    await Router.router?.push("../orders");
  };

  return (
    <main className="flex container m-auto min-h-screen items-center w-full md:w-2/3 lg:w-1/2">
      <FormContainer
        className="flex flex-col gap-4 w-full"
        onSuccess={handleSubmit}
        validator={{
          minPrice: [
            {
              pattern: /[0-9]+/i,
              error: "Минимальная сумма должна быть числом",
            },
          ],
          maxPrice: [
            {
              pattern: /[0-9]+/i,
              error: "Максимальная сумма должна быть числом",
            },
          ],
          location: [
            {
              pattern:
                /^г\. ([\w\d\sа-яА-Я]+), ул\. ([\w\d\sа-яА-Я]+), д\. ([\w\d\sа-яА-Я]+)(?:, кв\. ([\w\d\sа-яА-Я]+))?$/i,
              error:
                "Место проведения должно быть формата: г. Город, ул. Улица, д. Дом",
            },
          ],
        }}
      >
        <h2 className="text-center mb-8">Описание заказа</h2>

        <TextInput placeholder="Заголовок" name="title" required />

        <TextArea placeholder="Описание" name="description" required />

        <div className="flex gap-8">
          <TextInput
            placeholder="Мин. цена"
            type="number"
            name="minPrice"
            required
          />
          <TextInput
            placeholder="Макс. цена"
            type="number"
            name="maxPrice"
            required
          />
          <input defaultValue="RUB" name="currency" hidden />
        </div>

        <TextInput
          placeholder="Место проведения работы"
          name="location"
          required
        />

        <TextInput
          placeholder="Выделяемое время: 6 часов 30 минут"
          name="deadline"
          required
        />

        <Button>Отправить заказ</Button>
      </FormContainer>
    </main>
  );
}
