import type { Meta, StoryObj } from "@storybook/react";
import "@/src/app/styles";
import { Providers } from "@/src/app/provider";

import { Navigation } from "./Navigation";

const meta = {
	title: "BrainAI/Shared/Navigation",
	component: Navigation,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		return (
			<Providers>
				<Navigation />
			</Providers>
		);
	},
};
