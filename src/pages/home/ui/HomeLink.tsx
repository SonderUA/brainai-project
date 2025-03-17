import { ArticleIcon, ImageIcon, VideoIcon } from "@/src/shared/ui/icons";
import Link from "next/link";
import { capitalize } from "@/src/shared/lib";
import { JSX } from "react";
import { cn } from "@/src/shared/lib/cn";

interface HomeLinkProps {
	href: string;
	amount: number;
	className?: string;
}

const iconMapping: Record<string, JSX.Element> = {
	article: (
		<ArticleIcon className="w-10 h-10 p-2 rounded-lg bg-purple-400 text-white-500" />
	),
	video: (
		<VideoIcon className="w-10 h-10 p-2 rounded-lg bg-primary-400 text-white-500" />
	),
	image: (
		<ImageIcon className="w-10 h-10 p-2 rounded-lg bg-yellow-400 text-white-500" />
	),
};

const formatLabel = (source: string, output: string) => {
	return `${capitalize(source)} to ${capitalize(output)}`;
};

export const HomeLink: React.FC<HomeLinkProps> = ({
	href,
	amount,
	className,
}) => {
	const segments = href.split("/");

	const source = segments[1];
	const output = segments[0].split("-")[0];

	const icon = iconMapping[output];
	const label = formatLabel(source, output);

	return (
		<Link
			href={href}
			className={cn(
				"flex p-3.5 rounded-[0.625rem] justify-between items-center bg-weak-100 font-{--font-roboto}",
				className
			)}
		>
			<div className="flex gap-2.5">
				{icon}
				<div className="flex flex-col">
					<p className="font-medium">{label}</p>
					<p className="text-xs">{amount} Generated</p>
				</div>
			</div>
			<img
				src="/home/right-arrow.svg"
				alt="a right facing arrow"
				className="w-5 h-5"
			/>
		</Link>
	);
};
