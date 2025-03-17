import { cn } from "@/src/shared/lib/cn";

interface HomeBoxProps {
	text: string;
	img: React.ReactElement;
	className?: string;
}

const colorMap: Record<string, string> = {
	article: "bg-purple-100",
	video: "bg-primary-100",
	image: "bg-yellow-100",
	reimagine: "bg-blue-100",
};

export const HomeBox: React.FC<HomeBoxProps> = ({ text, img, className }) => {
	const switchColor = (text: string) => {
		const choice = text
			.toLowerCase()
			.split(" ")
			.at(-1) as keyof typeof colorMap;
		return colorMap[choice] || "";
	};

	return (
		<div
			className={cn(
				"flex flex-col pt-4 pl-[0.3125rem] gap-4 w-65.5 rounded-lg",
				switchColor(text),
				className
			)}
		>
			<p className="text-neutral-600 text-lg ml-[0.6875rem] font-medium">
				{text}
			</p>
			{img}
		</div>
	);
};
