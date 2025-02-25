import type { Meta, StoryObj } from "@storybook/react";
import "@/src/app/styles";

import { HomeLink } from "./HomeLink";

const meta = {
	title: "BrainAI/Pages/Home/HomeLink",
	component: HomeLink,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	args: {
		className: "w-85",
	},
} satisfies Meta<typeof HomeLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Article: Story = {
	args: {
		href: "article-generation/video",
		amount: 365,
	},
};

export const Image: Story = {
	args: {
		href: "image-creation/prompt",
		amount: 109,
	},
};

export const Video: Story = {
	args: {
		href: "video-creation/prompt",
		amount: 85,
	},
};
