interface HomeBoxProps {
	text: string;
	img: React.ReactElement;
	className?: string;
}

export const HomeBox = ({ text, img, className }: HomeBoxProps) => {
	const switchColor = (text: string) => {
		const choice = text.toLowerCase().split(" ").at(-1);
		switch (choice) {
			case "article":
				return "bg-purple-100";
			case "video":
				return "bg-primary-100";
			case "image":
				return "bg-yellow-100";
			case "reimagine":
				return "bg-blue-100";
		}
	};
	return (
		<div
			className={`flex flex-col pt-4 pl-[0.3125rem] gap-4 w-65.5 rounded-lg ${className} ${switchColor(
				text
			)}`}
		>
			<p className="text-neutral-600 text-lg ml-[0.6875rem] font-medium">
				{text}
			</p>
			{img}
		</div>
	);
};
