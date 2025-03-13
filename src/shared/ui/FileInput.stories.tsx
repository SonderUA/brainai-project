import type { Meta, StoryObj } from "@storybook/react";
import "@/src/app/styles";

import { FileInput } from "./FileInput";

const meta = {
	title: "BrainAI/Shared/FileInput",
	component: FileInput,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	args: {
		className: "w-65 h-20",
	},
} satisfies Meta<typeof FileInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Image: Story = {
	args: {
		id: "image",
		name: "image",
		accept: "image/*",
	},
};

export const Video: Story = {
	args: {
		id: "video",
		name: "video",
		accept: "video/*",
	},
};

export const Audio: Story = {
	args: {
		id: "audio",
		name: "audio",
		accept: "audio/*",
	},
};

export const Document: Story = {
	args: {
		id: "document",
		name: "document",
		accept: ".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	},
};
