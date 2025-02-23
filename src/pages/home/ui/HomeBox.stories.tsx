import type { Meta, StoryObj } from "@storybook/react";
import "@/src/app/styles";

import { HomeBox } from "./HomeBox";

const meta = {
	title: "BrainAI/Pages/Home/HomeBox",
	component: HomeBox,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof HomeBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Article: Story = {
	args: {
		text: "Image to Article",
		img: (
			<img
				src="/home/article-page.png"
				alt="an article generator image page"
				className="object-fill w-full h-auto"
			/>
		),
	},
};

export const Image: Story = {
	args: {
		text: "Prompt to Image",
		img: (
			<img
				src="/home/image-page.png"
				alt="an image creation main page"
				className="object-fill w-full h-auto"
			/>
		),
	},
};

export const Video: Story = {
	args: {
		text: "Audio to Video",
		img: (
			<img
				src="/home/video-page.png"
				alt="a video creation audio page"
				className="object-fill w-full h-auto"
			/>
		),
	},
};

export const Reimagine: Story = {
	args: {
		text: "Reimagine",
		img: (
			<img
				src="/home/reimagine-page.png"
				alt="an image generator reimagine page"
				className="object-fill w-full h-auto"
			/>
		),
	},
};
