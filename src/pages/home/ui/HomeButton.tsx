import { ArticleIcon, ImageIcon, VideoIcon } from "@/src/shared/ui/icons";
import Link from "next/link";

export const HomeButton = () => {
	return (
		<div className="flex items-center">
			<Link
				href="/image-creation/prompt"
				className="flex flex-col rounded-l-[3.125rem] border border-disabled-100 bg-white-500 items-center gap-1.5 max-h-fit py-2.5 -mr-4.25 px-5.5 max-sm-mobile:px-4 lg-mobile:px-8.5"
			>
				<ImageIcon className="w-5 h-5" />
				<p className="text-xs font-medium">Image Creation</p>
			</Link>
			<Link
				href="/article-generation/prompt"
				className="flex flex-col p-4 gap-1.5 bg-white-500 border items-center border-white-500 bg-primary-gradient rounded-[8.75rem] z-10"
			>
				<ArticleIcon className="w-7.5 h-7.5 text-white-500" />
				<p className="text-sm font-medium text-white-500">
					Article Generation
				</p>
			</Link>
			<Link
				href="/video-creation/prompt"
				className="flex flex-col py-2.5 gap-1.5 bg-white-500 border items-center border-disabled-100 max-h-fit -ml-4.25 rounded-r-[3.125rem] px-5.5 max-sm-mobile:px-4 lg-mobile:px-8.5"
			>
				<VideoIcon className="w-5 h-5" />
				<p className="text-xs font-medium">Video Creation</p>
			</Link>
		</div>
	);
};
