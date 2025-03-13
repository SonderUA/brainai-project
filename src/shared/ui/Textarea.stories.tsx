import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import "@/src/app/styles";

import { Textarea } from "./Textarea";

const meta = {
	title: "BrainAI/Shared/Textarea",
	component: Textarea,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	args: {
		id: "textarea",
		name: "textarea",
		placeholder: "Enter text ...",
		className: "h-20",
	},
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByTestId("textarea");

		await userEvent.type(input, "Example text input", { delay: 100 });
	},
};
