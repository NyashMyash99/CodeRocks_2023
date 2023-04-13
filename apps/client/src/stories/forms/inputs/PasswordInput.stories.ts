import { Meta, StoryObj } from "@storybook/react";

import { PasswordInput } from "../../../components/form/inputs/PasswordInput";

type Story = StoryObj<typeof PasswordInput>;
export default {
  title: "Forms/Inputs/PasswordInput",
  component: PasswordInput,
} as Meta<typeof PasswordInput>;

export const Base: Story = {
  args: {
    placeholder: "Hello World!",
    defaultValue: "Hello World!",
  },
};

export const Visible: Story = {
  args: {
    ...Base.args,
    passwordVisibility: "visible",
  },
};

export const Hidden: Story = {
  args: {
    ...Base.args,
    passwordVisibility: "hidden",
  },
};
