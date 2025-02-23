import type { Meta, StoryObj } from "@storybook/react";
import "@/src/app/styles";
import { StorybookLayout } from "@/src/app/layouts/index";

import { default as Home } from "./Home";

const meta = {
	title: "BrainAI/Pages/Home",
	decorators: [
		(Story) => (
			<StorybookLayout>
				<Story />
			</StorybookLayout>
		),
	],
	component: Home,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
