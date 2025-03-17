"use client";
import { Textarea, FileInput } from "@/src/shared/ui";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/src/app/store";
import { JSX } from "react";
import React from "react";

const inputMapping: Record<string, JSX.Element> = {
	prompt: (
		<Textarea
			id="textarea"
			name="textarea"
			placeholder="Type a prompt ..."
			className="h-[9.375rem]"
			required
		/>
	),
	image: (
		<FileInput
			id="image"
			name="file"
			className="h-20"
			accept="image/*"
			required
		/>
	),
	video: (
		<FileInput
			id="video"
			name="file"
			className="h-20"
			accept="video/*"
			required
		/>
	),
	audio: (
		<FileInput
			id="audio"
			name="file"
			className="h-20"
			accept="audio/*"
			required
		/>
	),
	document: (
		<FileInput
			id="document"
			name="file"
			className="h-20"
			accept=".doc,.docx,.pdf,.txt"
			required
		/>
	),
};

export default function ArticleInput() {
	const pathname = usePathname()!;
	const source = useSelector((state: RootState) =>
		state.articleForm.selects.at(-1)
	)!;

	const format = (text: string) => {
		return `${text.slice(1).split("/")[1]}`;
	};

	const switchInput = (input: string) => {
		if (source.value !== "local" && input !== "prompt") {
			return (
				<Textarea
					id="weblink"
					name="weblink"
					placeholder="Paste the link here ..."
					className="h-20"
					required
				/>
			);
		}

		return inputMapping[input] || null;
	};

	return <>{switchInput(format(pathname))}</>;
}
