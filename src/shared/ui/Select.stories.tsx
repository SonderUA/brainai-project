import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import "@/src/app/styles";
import { Providers } from "@/src/app/provider";

import { Select } from "./Select";

const options = [
	{ value: "english", label: "English" },
	{ value: "bengali", label: "Bengali" },
	{ value: "spanish", label: "Spanish" },
	{ value: "arabic", label: "Arabic" },
	{ value: "turkish", label: "Turkish" },
	{ value: "russian", label: "Russian" },
	{ value: "japanese", label: "Japanese" },
	{ value: "chinese", label: "Chinese" },
	// Add more options as needed
];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "BrainAI/Shared/Select",
	component: Select,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: "centered",
	},
	decorators: [
		(Story) => (
			<Providers>
				<Story />
			</Providers>
		),
	],
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ["autodocs"],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	args: {
		id: "select",
		options: options,
		selectedOption: options[0],
		onSelect: (option: { value: string; label: string }) => {
			console.log("Selected option:", option);
		},
	},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Closed: Story = {};

export const Open: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await userEvent.click(canvas.getByRole("button"), { delay: 200 });
	},
};

export const Selected: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await userEvent.click(canvas.getByRole("button"), { delay: 200 });
		await userEvent.click(canvas.getAllByRole("option")[0], { delay: 500 });
		await userEvent.click(canvas.getByRole("button"), { delay: 500 });
	},
};
