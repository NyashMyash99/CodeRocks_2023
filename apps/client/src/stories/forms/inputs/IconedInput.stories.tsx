import { Meta, StoryObj } from "@storybook/react";
import { FaKey, FaPassport } from "react-icons/fa";

import { IconedInput } from "../../../components/form/inputs/IconedInput";

type Story = StoryObj<typeof IconedInput>;
export default {
  title: "Forms/Inputs/IconedInput",
  component: IconedInput,
} as Meta<typeof IconedInput>;

export const Base: Story = {
  args: {
    placeholder: "Hello World!",
  },
};

export const Iconed: Story = {
  args: {
    ...Base.args,
    startIcon: <FaKey />,
    endIcon: <FaPassport />,
  },
};

export const Small: Story = {
  args: {
    ...Iconed.args,
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    ...Iconed.args,
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    ...Iconed.args,
    size: "large",
  },
};

export const Default: Story = {
  args: {
    ...Iconed.args,
    rounding: "default",
  },
};

export const Rounded: Story = {
  args: {
    ...Iconed.args,
    rounding: "rounded",
  },
};

export const HighlyRounded: Story = {
  args: {
    ...Iconed.args,
    rounding: "h-rounded",
  },
};
