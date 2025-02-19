import type { Meta, StoryObj } from "@storybook/react";
import "@/src/app/styles";

import { Button } from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "BrainAI/Shared/Button",
	component: Button,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: "centered",
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ["autodocs"],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	args: {
		color: "white",
	},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
	args: {
		intent: "primary",
		size: "medium",
		label: "Button",
	},
};

export const Secondary: Story = {
	args: {
		intent: "secondary",
		size: "medium",
		label: "Button",
	},
};

export const Tertiary: Story = {
	args: {
		intent: "tertiary",
		size: "medium",
		label: "Button",
	},
};

export const Large: Story = {
	args: {
		intent: "secondary",
		size: "large",
		label: "Button",
	},
};

export const Medium: Story = {
	args: {
		intent: "secondary",
		size: "medium",
		label: "Button",
	},
};

export const Small: Story = {
	args: {
		intent: "secondary",
		size: "small",
		label: "Button",
	},
};

export const Gray: Story = {
	args: {
		intent: "secondary",
		size: "medium",
		label: "Button",
		color: "gray",
	},
};

const svg = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="18"
		height="18"
		viewBox="0 0 18 18"
		fill="none"
	>
		<path
			d="M0.681232 11.1265C0.736187 13.6542 0.763665 14.9181 1.70639 15.8541C2.64912 16.7901 3.96116 16.8225 6.58524 16.8874C8.20073 16.9273 9.80188 16.9273 11.4174 16.8874C14.0415 16.8225 15.3535 16.7901 16.2962 15.8541C17.2389 14.9181 17.2664 13.6542 17.3214 11.1265C17.3483 9.88807 17.3342 8.66184 17.2792 7.41074C17.245 6.63369 17.2279 6.24516 17.0308 5.90052C16.8338 5.55588 16.4941 5.33345 15.8147 4.88857L12.6806 2.83637C10.8965 1.66811 10.0044 1.08398 9.0013 1.08398C7.99817 1.08398 7.10611 1.66811 5.32199 2.83637L2.18794 4.88857C1.50855 5.33345 1.16885 5.55588 0.97179 5.90052C0.774732 6.24516 0.757633 6.63369 0.723435 7.41075C0.668376 8.66184 0.654308 9.88807 0.681232 11.1265Z"
			stroke="url(#paint0_linear_4356_53)"
			stroke-width="1.25"
			stroke-linejoin="round"
		/>
		<path
			d="M0.667969 6.91699L4.22245 9.49168C4.61427 9.7755 4.97286 10.0352 5.30464 10.2709C6.20139 10.9079 6.84848 11.0837 7.94815 11.0837H10.0545C11.1541 11.0837 11.8012 10.9079 12.698 10.2709C13.0297 10.0352 13.3883 9.7755 13.7802 9.49169L17.3346 6.91699"
			stroke="url(#paint1_linear_4356_53)"
			stroke-width="1.25"
			stroke-linejoin="round"
		/>
		<defs>
			<linearGradient
				id="paint0_linear_4356_53"
				x1="8.75764"
				y1="1.57878"
				x2="8.75764"
				y2="13.7836"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#2A0856" />
				<stop offset="1" stop-color="#3E0B80" />
			</linearGradient>
			<linearGradient
				id="paint1_linear_4356_53"
				x1="8.75764"
				y1="7.0472"
				x2="8.75764"
				y2="10.259"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#2A0856" />
				<stop offset="1" stop-color="#3E0B80" />
			</linearGradient>
		</defs>
	</svg>
);

export const Icon: Story = {
	args: {
		intent: "secondary",
		icon: true,
		size: "medium",
		svg: svg,
	},
};

export const IconWithText: Story = {
	args: {
		intent: "secondary",
		size: "medium",
		label: "Button",
		svg: svg,
	},
};
