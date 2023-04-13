import { Meta, StoryObj } from "@storybook/react";

import { TextArea } from "../../../components/form/inputs/TextArea";

type Story = StoryObj<typeof TextArea>;
export default {
  title: "Forms/Inputs/TextArea",
  component: TextArea,
} as Meta<typeof TextArea>;

export const Base: Story = {
  args: {
    placeholder: "Hello World!\nI'm placeholder",
  },
};
