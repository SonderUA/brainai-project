import type { Meta, StoryObj } from "@storybook/react";
import "@/src/app/styles";

import { HomeButton } from "./HomeButton";

const meta = {
	title: "BrainAI/Pages/Home/HomeButton",
	component: HomeButton,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof HomeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
