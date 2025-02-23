import { ArticleIcon, ImageIcon, VideoIcon } from "@/src/shared/ui/icons";
import Link from "next/link";

interface HomeLinkProps {
	href: string;
	text: string;
	amount: number;
	className?: string;
}

export const HomeLink = ({ href, text, amount, className }: HomeLinkProps) => {
	const switchIcon = (text: string) => {
		const choice = text.toLowerCase().split(" ").at(-1);
		switch (choice) {
			case "article":
				return (
					<ArticleIcon
						color="white"
						className="w-10 h-10 p-2 rounded-lg bg-purple-400"
					/>
				);
			case "video":
				return (
					<VideoIcon
						color="white"
						className="w-10 h-10 p-2 rounded-lg bg-primary-400"
					/>
				);
			case "image":
				return (
					<ImageIcon
						color="white"
						className="w-10 h-10 p-2 rounded-lg bg-yellow-400"
					/>
				);
		}
	};
	return (
		<Link
			href={href}
			className={`flex p-3.5 rounded-[0.625rem] justify-between items-center bg-weak-100 font-{--font-roboto} ${className}`}
		>
			<div className="flex gap-2.5">
				{switchIcon(text)}
				<div className="flex flex-col">
					<p className="font-medium">{text}</p>
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
