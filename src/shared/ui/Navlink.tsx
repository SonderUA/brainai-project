"use client";
import Link from "next/link";
import { buttonVariants } from "@/src/shared/ui/Button";
import { usePathname } from "next/navigation";

type NavlinkProps = {
	text: string;
	href: string;
	main?: boolean;
	center?: boolean;
	svg?: React.ReactNode;
	className?: string;
};

export const Navlink = ({
	text,
	href,
	svg,
	main = true,
	center = false,
	className,
}: NavlinkProps) => {
	const pathname = usePathname()!;
	const format = (text: string) => {
		if (main) return `/${text.slice(1).split("/")[0]}`;
		return text;
	};

	return (
		<Link
			href={href}
			className={`${center ? "justify-center" : ""} ${
				format(pathname) === format(href)
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
					  })
			} ${className}`}
		>
			{svg !== undefined && svg}
			{text}
		</Link>
	);
};
