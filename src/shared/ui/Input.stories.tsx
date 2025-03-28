import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import "@/src/app/styles";

import { Input } from "./Input";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "BrainAI/Shared/Input",
	component: Input,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: "centered",
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ["autodocs"],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Text: Story = {
	args: {
		id: "text",
		name: "text",
		type: "text",
		placeholder: "Enter text",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByTestId("text");

		await userEvent.type(input, "example123", { delay: 100 });
	},
};

export const Password: Story = {
	args: {
		id: "password",
		name: "password",
		type: "password",
		placeholder: "Enter password",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByTestId("password");

		await userEvent.type(input, "password123", { delay: 100 });
	},
};

export const Email: Story = {
	args: {
		id: "email",
		name: "email",
		type: "email",
		placeholder: "example@gmail.com",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByTestId("email");

		await userEvent.type(input, "userinput@gmail.com", { delay: 100 });
	},
};
