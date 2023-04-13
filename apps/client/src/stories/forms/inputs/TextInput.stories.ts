import { Meta, StoryObj } from "@storybook/react";

import { TextInput } from "../../../components/form/inputs/TextInput";

type Story = StoryObj<typeof TextInput>;
export default {
  title: "Forms/Inputs/TextInput",
  component: TextInput,
} as Meta<typeof TextInput>;

export const Base: Story = {
  args: {
    placeholder: "Hello World!",
  },
};
