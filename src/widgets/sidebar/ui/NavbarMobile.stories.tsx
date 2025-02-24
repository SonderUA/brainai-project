import type { Meta, StoryObj } from "@storybook/react";
import "@/src/app/styles";

import { NavbarMobile } from "./NavbarMobile";

const meta = {
	title: "BrainAI/Widgets/Sidebar/NavbarMobile",
	component: NavbarMobile,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof NavbarMobile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
