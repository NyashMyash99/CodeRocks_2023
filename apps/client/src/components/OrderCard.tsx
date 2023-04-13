import moment from "moment";
import { Button } from "./form/buttons/Button";
import { Currency } from "../utils/constants/currency.constants";
import { useLazySubscribeOrderQuery } from "../store/orders/orders.api";
import { toastError, toastSuccess } from "../utils/helpers/toast.helpers";
import { useState } from "react";
import { UserModel } from "../utils/models/users.models";

interface OrderCardProps {
  id: string;
  userId: string;
  customer: UserModel;
  title: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  currency: Currency;
  deadline: number;
  location: string;
  isResponded?: boolean;
}

export const OrderCard = ({
  id,
  userId,
  customer,
  title,
  description,
  minPrice,
  maxPrice,
  currency,
  deadline,
  location,
  isResponded: isRespondedProp = false,
}: OrderCardProps) => {
  const [isResponded, setIsResponded] = useState(isRespondedProp);
  const [subscribe] = useLazySubscribeOrderQuery();

  const handleSubscribe = async () => {
    if (isResponded || userId === customer.id) return;

    const { isError, error } = await subscribe(id);

    if (isError) {
      // @ts-ignore
      for (const message of error.message as string[])
        toastError(message.capitalize());
      return;
    }

    toastSuccess(
      `Вы откликнулись на заявку пользователя ${customer.profile.firstName} ${customer.profile.lastName} (${customer.email}).`
    );
    setIsResponded(true);
  };

  return (
    <section className="card-shadow gap-4">
      <div className="flex justify-between items-center flex-col sm:flex-row">
        <h2>{title}</h2>

        <small className="font-semibold">
          {minPrice} – {maxPrice} {currency} за{" "}
          {moment.duration(deadline).locale("ru").humanize()}
        </small>
      </div>

      <div>{description}</div>

      <address>{location}</address>

      {!userId ? (
        ""
      ) : (
        <Button
          variant="outline"
          className="w-full sm:w-1/2 xl:w-1/4"
          size="small"
          disabled={isResponded || userId === customer.id}
          onClick={handleSubscribe}
        >
          {isResponded
            ? "Вы откликнулись!"
            : userId === customer.id
            ? "Это ваш запрос"
            : "Откликнуться"}
        </Button>
      )}
    </section>
  );
};
