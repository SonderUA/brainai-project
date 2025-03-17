import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/shared/lib/cn";

const buttonVariants = cva(
	"rounded-[0.625rem] cursor-pointer flex gap-2 font-medium items-center",
	{
		variants: {
			intent: {
				primary: [
					"bg-primary-gradient",
					"border-transparent",
					"text-white-500",
					"px-4",
				],
				secondary: [
					"border-primary-100",
					"border-x",
					"border-y",
					"px-3",
				],
				tertiary: [
					"text-neutral-500",
					"bg-transparent",
					"border-transparent",
					"px-3",
				],
			},
			size: {
				small: ["text-sm", "py-2.5"],
				medium: ["text-base", "py-[0.6875rem]"],
				large: ["text-base", "py-[0.8125rem]"],
			},
			color: {
				transparent: "bg-transparent",
				gray: "bg-weak-100",
				white: "bg-white-500",
			},
			icon: {
				true: "",
			},
		},
		compoundVariants: [
			{
				size: "medium",
				icon: true,
				className: "py-[0.75rem]",
			},
			{
				intent: ["secondary", "tertiary"],
				icon: true,
				className: "px-4", // Overrides px-3
			},
			{
				size: "medium",
				intent: "secondary",
				className: "m-0.5 border-none gradient-border",
			},
		],
		defaultVariants: {
			intent: "primary",
			size: "medium",
			color: "transparent",
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	/** Button text */
	label?: string;
	/** Button intent */
	intent?: "primary" | "secondary" | "tertiary";
	/** Size of the button */
	size?: "small" | "medium" | "large";
	/** Button color */
	color?: "transparent" | "gray" | "white";
	/** Is there only an icon? */
	icon?: boolean;
	/** Button icon svg */
	svg?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
	intent,
	size,
	color,
	label,
	icon,
	svg,
	className,
	...props
}) => {
	return (
		<button
			className={buttonVariants({ intent, size, color, className, icon })}
			{...props}
		>
			{svg !== undefined && svg}
			{label !== undefined && (
				<span
					className={cn(
						intent === "secondary" &&
							"bg-text-gradient bg-clip-text text-transparent"
					)}
				>
					{label}
				</span>
			)}
		</button>
	);
};

export { Button, buttonVariants };
