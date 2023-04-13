import React from "react";
import { Provider } from "react-redux";
import { Meta, StoryObj } from "@storybook/react";
import { store } from "../../store/store";
import { MOCK_ORDER_DATA } from "../../utils/constants/mock.constants";

import { OrderCard } from "../../components/OrderCard";

type Story = StoryObj<typeof OrderCard>;
export default {
  title: "Components/OrderCard",
  component: OrderCard,
  render: (props) => (
    <Provider store={store}>
      <OrderCard {...props} />
    </Provider>
  ),
} as Meta<typeof OrderCard>;

export const Base: Story = {
  args: {
    ...MOCK_ORDER_DATA[0],
    userId: "id",
  },
};

export const Responded: Story = {
  args: {
    ...Base.args,
    isResponded: true,
  },
};

export const Yours: Story = {
  args: {
    ...Base.args,
    userId: MOCK_ORDER_DATA[0].customer.id,
    customer: MOCK_ORDER_DATA[0].customer,
  },
};

export const Guest: Story = {
  args: {
    ...Base.args,
    userId: "",
  },
};
