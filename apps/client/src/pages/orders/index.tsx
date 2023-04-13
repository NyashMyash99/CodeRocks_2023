import React, { useEffect } from "react";
import { useListOrdersQuery } from "../../store/orders/orders.api";
import { useAuthState } from "../../store/auth/auth.slice";
import { OrderCard } from "../../components/OrderCard";
import jwtDecode from "jwt-decode";
import { Button } from "../../components/form/buttons/Button";
import { scrollTo } from "../../utils/helpers/scroll.helpers";
import Router from "next/router";
import { FaHome, FaWarehouse } from "react-icons/fa";
import { toastInfo } from "../../utils/helpers/toast.helpers";

export default function Orders() {
  const { isLoading, data: orders } = useListOrdersQuery();
  const { token } = useAuthState();
  const userId = token ? (jwtDecode(token) as any)?.userId : "";

  useEffect(() => {
    orders?.forEach((order) => {
      if (order.customer.id !== userId) return;
      if (!order.performers.length) return;

      toastInfo(
        `На вашу заявку \"${order.title}\" откликнулись: ${order.performers
          .map(
            (performer) =>
              `${performer.profile.firstName} ${performer.profile.lastName} (${performer.email})`
          )
          .join(", ")}.`
      );
    });
  }, [orders]);

  useEffect(() => {
    document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-scroll");

    return () => {
      document.body.classList.add("overflow-hidden");
      document.body.classList.remove("overflow-scroll");
    };
  }, []);

  return (
    <main className="p-4 container m-auto min-h-screen items-center w-full">
      <section className="landing-section">
        <h1>Навигация</h1>

        <nav className="flex gap-8">
          <div className="flex flex-col gap-2 text-center">
            <Button
              className="bg-white-opacity py-8 m-auto"
              width="fit"
              variant="outline"
              onClick={() => scrollTo("MENU")}
            >
              <FaWarehouse />
            </Button>

            <small className="font-semibold">Просмотреть заказы</small>
          </div>

          <div className="flex flex-col gap-2 text-center">
            <Button
              className="bg-white-opacity py-8 m-auto"
              width="fit"
              variant="outline"
              onClick={() => Router.router?.replace("/")}
            >
              <FaHome />
            </Button>

            <small className="font-semibold">К главной странице</small>
          </div>
        </nav>
      </section>

      <div className="flex flex-col m-auto gap-6 w-full md:w-2/3 lg:w-1/2">
        {isLoading
          ? "Загрузка..."
          : orders?.map((order) => (
              <OrderCard
                key={order.id}
                userId={userId}
                isResponded={order.performers.includes(userId)}
                {...order}
              />
            ))}
      </div>
    </main>
  );
}
