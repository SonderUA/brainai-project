import {
	ArticleIcon,
	AudioIcon,
	DocumentIcon,
	ImageIcon,
	VideoIcon,
} from "@/src/shared/ui/icons";

export const articleLinks = [
	{
		text: "prompt",
		svg: <ArticleIcon className="w-5 h-5" />,
	},
	{ text: "image", svg: <ImageIcon className="w-5 h-5" /> },
	{ text: "video", svg: <VideoIcon className="w-5 h-5" /> },
	{ text: "audio", svg: <AudioIcon className="w-5 h-5" /> },
	{ text: "document", svg: <DocumentIcon className="w-5 h-5" /> },
];

export const postLinks = ["editor", "website", "blogger", "medium", "linkedIn"];

export const selectData = [
	{
		id: "language",
		label: "Select Article Language",
		options: [
			{ value: "english", label: "English" },
			{ value: "spanish", label: "Spanish" },
			{ value: "french", label: "French" },
			{ value: "german", label: "German" },
			{ value: "chinese", label: "Chinese" },
			{ value: "russian", label: "Russian" },
			{ value: "japanese", label: "Japanese" },
		],
	},
	{
		id: "type",
		label: "Select Article Length",
		options: [
			{ value: "short", label: "Short" },
			{ value: "medium", label: "Medium" },
			{ value: "long", label: "Long" },
		],
	},
	{
		id: "style",
		label: "Select Article Style",
		options: [
			{ value: "formal", label: "Formal" },
			{ value: "informal", label: "Informal" },
			{ value: "technical", label: "Technical" },
			{ value: "conversational", label: "Conversational" },
			{ value: "storytelling", label: "Storytelling" },
			{ value: "persuasive", label: "Persuasive" },
			{ value: "descriptive", label: "Descriptive" },
			{ value: "instructional", label: "Instructional" },
			{ value: "humorous", label: "Humorous" },
			{ value: "analytical", label: "Analytical" },
			{ value: "creative", label: "Creative" },
			{ value: "business", label: "Business" },
		],
	},
	{
		id: "source",
		label: "Select Source",
		options: [
			{ value: "local", label: "Local Disk" },
			{ value: "weblink", label: "Weblink" },
		],
	},
];
