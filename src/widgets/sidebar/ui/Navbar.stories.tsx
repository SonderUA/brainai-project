import type { Meta, StoryObj } from "@storybook/react";
import "@/src/app/styles";

import { Navbar } from "./Navbar";

const meta = {
	title: "BrainAI/Widgets/Sidebar/Navbar",
	component: Navbar,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
