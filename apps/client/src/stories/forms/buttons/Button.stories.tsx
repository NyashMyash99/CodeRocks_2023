import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../../components/form/buttons/Button";

type Story = StoryObj<typeof Button>;
export default {
  title: "Forms/Buttons/Button",
  component: Button,
} as Meta<typeof Button>;

export const Base: Story = {
  args: {
    children: "Hello World!",
  },
};

export const Small: Story = {
  args: {
    ...Base.args,
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    ...Base.args,
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    ...Base.args,
    size: "large",
  },
};

export const Default: Story = {
  args: {
    ...Base.args,
    rounding: "default",
  },
};

export const Rounded: Story = {
  args: {
    ...Base.args,
    rounding: "rounded",
  },
};

export const HighlyRounded: Story = {
  args: {
    ...Base.args,
    rounding: "h-rounded",
  },
};

export const Filled: Story = {
  args: {
    ...Base.args,
    variant: "filled",
  },
};

export const Outline: Story = {
  args: {
    ...Base.args,
    variant: "outline",
  },
};
