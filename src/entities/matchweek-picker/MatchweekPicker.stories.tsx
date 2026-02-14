import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { MatchweekPicker } from "./MatchweekPicker";

const meta = {
  component: MatchweekPicker,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof MatchweekPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const weeks = Array.from({ length: 38 }, (_, i) => i + 1);

export const Default: Story = {
  args: { weeks, value: 38, onValueChange: () => {} },
  render: function Default(args) {
    const [value, setValue] = useState<number | null>(args.value ?? 38);
    return (
      <MatchweekPicker
        weeks={args.weeks}
        value={value}
        onValueChange={setValue}
        placeholder={args.placeholder}
      />
    );
  },
};

export const NoSelection: Story = {
  args: { weeks, value: null, onValueChange: () => {} },
  render: function NoSelection(args) {
    const [value, setValue] = useState<number | null>(args.value);
    return (
      <MatchweekPicker
        weeks={args.weeks}
        value={value}
        onValueChange={setValue}
        placeholder={args.placeholder}
      />
    );
  },
};
