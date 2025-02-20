import type { Meta, StoryObj } from "@storybook/react";
import "@/src/app/styles";
import { RouterContext } from "@/src/shared/mocks";
import { action } from "@storybook/addon-actions";

import { Profile } from "./Profile";

const mockRouter = {
	push: action("router.push"),
	replace: action("router.replace"),
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "BrainAI/Widgets/Sidebar/Profile",
	decorators: [
		(Story) => (
			<RouterContext.Provider value={mockRouter}>
				<Story />
			</RouterContext.Provider>
		),
	],
	component: Profile,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: "centered",
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ["autodocs"],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof Profile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		username: "uisaleh",
		tokens: 100,
		plan: "personal",
		img: <img src="/image.svg" alt="user picture" className="w-9 h-9" />,
	},
};
