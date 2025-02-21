import type { Meta, StoryObj } from "@storybook/react";
import "@/src/app/styles";

import { Button } from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "BrainAI/Shared/Button",
	component: Button,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: "centered",
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ["autodocs"],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	args: {
		color: "white",
	},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
	args: {
		intent: "primary",
		size: "medium",
		label: "Button",
	},
};

export const Secondary: Story = {
	args: {
		intent: "secondary",
		size: "medium",
		label: "Button",
	},
};

export const Tertiary: Story = {
	args: {
		intent: "tertiary",
		size: "medium",
		label: "Button",
	},
};

export const Large: Story = {
	args: {
		intent: "secondary",
		size: "large",
		label: "Button",
	},
};

export const Medium: Story = {
	args: {
		intent: "secondary",
		size: "medium",
		label: "Button",
	},
};

export const Small: Story = {
	args: {
		intent: "secondary",
		size: "small",
		label: "Button",
	},
};

export const Gray: Story = {
	args: {
		intent: "secondary",
		size: "medium",
		label: "Button",
		color: "gray",
	},
};

export const Icon: Story = {
	args: {
		intent: "secondary",
		icon: true,
		size: "medium",
		svg: <img src="/sidebar/home.svg" alt="a home" className="w-5 h-5" />,
	},
};

export const IconWithText: Story = {
	args: {
		intent: "secondary",
		size: "medium",
		label: "Button",
		svg: <img src="/sidebar/home.svg" alt="a home" className="w-5 h-5" />,
	},
};
