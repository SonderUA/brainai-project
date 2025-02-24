import type { Meta, StoryObj } from "@storybook/react";
import "@/src/app/styles";

import { Footer } from "./Footer";

const meta = {
	title: "BrainAI/Widgets/Sidebar/Footer",
	component: Footer,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	args: {
		className: "w-55.5",
	},
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
