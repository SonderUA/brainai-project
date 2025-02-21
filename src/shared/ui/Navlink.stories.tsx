import type { Meta, StoryObj } from "@storybook/react";
import "@/src/app/styles";

import { Navlink } from "./Navlink";

const meta = {
	title: "BrainAI/Shared/Navlink",
	component: Navlink,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	args: {
		className: "w-32",
		text: "Home",
		href: "/",
	},
} satisfies Meta<typeof Navlink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		href: "/home",
	},
};

export const Primary: Story = {
	args: {
		main: true,
	},
};

export const WithIcon: Story = {
	args: {
		main: true,
		svg: <img src="/sidebar/home.svg" alt="a home" className="w-5 h-5" />,
	},
};

export const Secondary: Story = {
	args: {
		main: false,
	},
};

export const Centered: Story = {
	args: {
		main: false,
		center: true,
	},
};
