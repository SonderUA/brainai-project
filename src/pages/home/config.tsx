export const linkElements = [
	{ href: "article-generation/video", text: "Video to Article", amount: 365 },
	{ href: "article-generation/audio", text: "Audio to Article", amount: 282 },
	{ href: "video-creation/audio", text: "Audio to Video", amount: 136 },
	{ href: "image-creation/prompt", text: "Prompt to Image", amount: 109 },
	{ href: "video-creation/prompt", text: "Prompt to Video", amount: 85 },
	{
		href: "article-generation/prompt",
		text: "Prompt to Article",
		amount: 17,
	},
];

export const boxElements = [
	{
		text: "Image to Article",
		img: (
			<img
				src="/home/article-page.png"
				alt="an article generator image page"
				className="object-fill w-full h-auto"
			/>
		),
		className: "",
	},
	{
		text: "Prompt to Image",
		img: (
			<img
				src="/home/image-page.png"
				alt="an image creation main page"
				className="object-fill w-full h-auto"
			/>
		),
		className: "max-sm-laptop:hidden",
	},
	{
		text: "Audio to Video",
		img: (
			<img
				src="/home/video-page.png"
				alt="a video creation audio page"
				className="object-fill w-full h-auto"
			/>
		),
		className: "max-lg-laptop:hidden",
	},
	{
		text: "Reimagine",
		img: (
			<img
				src="/home/reimagine-page.png"
				alt="an image generator reimagine page"
				className="object-fill w-full h-auto"
			/>
		),
		className: "max-desktop:hidden",
	},
];

export const communityImages = [
	{
		src: "/home/image.png",
		alt: "some trees on a landscape",
	},
	{
		src: "/home/image2.png",
		alt: "a cat teaching a lesson",
	},
	{
		src: "/home/image7.png",
		alt: "organic products",
	},
	{
		src: "/home/image4.png",
		alt: "a vibrant sunflower",
	},
	{
		src: "/home/image3.png",
		alt: "an old happy man",
	},
	{
		src: "/home/image5.png",
		alt: "a vibrant sunflower",
	},
	{
		src: "/home/image6.png",
		alt: "a ship on a moon",
	},
	{
		src: "/home/image8.png",
		alt: "a skull with flowers",
	},
];
