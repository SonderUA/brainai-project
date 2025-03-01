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

export const Default: Story = {
	args: {
		user: {
			id: "cm7nhadbo0000o714ljrtyd8x",
			name: "SonderUA",
			email: "user.example@gmail.com",
			emailVerified: null,
			image: "https://avatars.githubusercontent.com/u/163440629?v=4",
			tokens: 58,
			createdAt: new Date("2025-02-27T15:07:25.812Z"),
			updatedAt: new Date("2025-02-27T15:07:25.812Z"),
		},
	},
};
