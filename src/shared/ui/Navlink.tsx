"use client";
import Link from "next/link";
import { buttonVariants } from "@/src/shared/ui/Button";
import { usePathname } from "next/navigation";
import { cn } from "@/src/shared/lib/cn";

type NavlinkProps = {
	text: string;
	href: string;
	main?: boolean;
	center?: boolean;
	svg?: React.ReactNode;
	className?: string;
};

export const Navlink: React.FC<NavlinkProps> = ({
	text,
	href,
	svg,
	main = true,
	center = false,
	className,
}) => {
	const pathname = usePathname()!;
	const format = (text: string) => {
		if (main) return `/${text.slice(1).split("/")[0]}`;
		return text;
	};

	const isSelected = format(pathname) === format(href);

	const baseVariant = isSelected
		? main
			? buttonVariants({
					intent: "secondary",
					size: "small",
					className: "bg-white-500",
			  })
			: buttonVariants({
					intent: "primary",
					size: "small",
			  })
		: buttonVariants({
				intent: "tertiary",
				size: "small",
		  });

	return (
		<Link
			href={href}
			className={cn(
				center && "justify-center",
				baseVariant,
				isSelected && "text-primary-800",
				className
			)}
		>
			{svg !== undefined && svg}
			<span
				className={cn(
					"text-inherit text-sm",
					isSelected &&
						main &&
						"bg-text-gradient bg-clip-text text-transparent text-sm"
				)}
			>
				{text}
			</span>
		</Link>
	);
};
