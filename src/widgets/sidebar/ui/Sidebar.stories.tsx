import type { Meta, StoryObj } from "@storybook/react";
import "@/src/app/styles";

import { Sidebar } from "./Sidebar";

const meta = {
	title: "BrainAI/Widgets/Sidebar",
	component: Sidebar,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
