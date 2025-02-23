import { ArticleIcon, ImageIcon, VideoIcon } from "@/src/shared/ui/icons";

export const MainLinks = [
	[
		{
			href: "/",
			text: "Home",
			svg: (
				<img
					src="/sidebar/home.svg"
					alt="a home link"
					className="w-5 h-5"
				/>
			),
		},
		{
			href: "/article-generation/prompt",
			text: "Article Generation",
			svg: <ArticleIcon color="black" className="w-5 h-5" />,
		},
		{
			href: "/image-creation",
			text: "Image Creation",
			svg: <ImageIcon color="black" className="w-5 h-5" />,
		},
		{
			href: "/video-creation",
			text: "Video Creation",
			svg: <VideoIcon color="black" className="w-5 h-5" />,
		},
	],
	[
		{
			href: "/analytics",
			text: "Analytics",
			svg: (
				<img
					src="/sidebar/analytics.svg"
					alt="a growing chart"
					className="w-5 h-5"
				/>
			),
		},
		{
			href: "/library",
			text: "Library",
			svg: (
				<img
					src="/sidebar/library.svg"
					alt="Library"
					className="w-5 h-5"
				/>
			),
		},
		{
			href: "/my-wallet",
			text: "My Wallet",
			svg: (
				<img
					src="/sidebar/wallet.svg"
					alt="My Wallet"
					className="w-5 h-5"
				/>
			),
		},
		{
			href: "/subscription",
			text: "Subscription",
			svg: (
				<img src="/sidebar/card.svg" alt="a card" className="w-5 h-5" />
			),
		},
	],
	[
		{
			href: "/whats-new",
			text: "What's New",
			svg: (
				<img src="/sidebar/star.svg" alt="a star" className="w-5 h-5" />
			),
		},
		{
			href: "/premium-plans",
			text: "Premium Plans",
			svg: (
				<img
					src="/sidebar/crown.svg"
					alt="Premium Plans"
					className="w-5 h-5"
				/>
			),
		},
		{
			href: "/api-access",
			text: "API Access",
			svg: (
				<img
					src="/sidebar/api.svg"
					alt="API Access"
					className="w-5 h-5"
				/>
			),
		},
		{
			href: "/settings",
			text: "Settings",
			svg: (
				<img
					src="/sidebar/settings.svg"
					alt="Settings"
					className="w-5 h-5"
				/>
			),
		},
		{
			href: "/faq-and-help",
			text: "FAQ & Help",
			svg: (
				<img
					src="/sidebar/question.svg"
					alt="FAQ & Help"
					className="w-5 h-5"
				/>
			),
		},
	],
];
