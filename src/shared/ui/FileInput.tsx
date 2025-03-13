"use client";
import { useState } from "react";

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	/** Input id */
	id: string;
	/** Input name */
	name: string;
	/** Input file extension */
	accept: string;
	/** Additional styling */
	className?: string;
}

export const FileInput = ({ className, accept, ...props }: FileInputProps) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const switchInput = (input: string) => {
		switch (input) {
			case "image/*":
				return "Image";
			case "audio/*":
				return "Audio";
			case "video/*":
				return "Video";
			default:
				return "Document";
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files ? event.target.files[0] : null;
		if (file) {
			setSelectedFile(file);
		}
	};

	return (
		<div className="flex flex-col gap-2 w-full">
			<input
				className="sr-only"
				type="file"
				accept={accept}
				data-testid={props.id}
				{...props}
				onChange={handleChange}
			/>
			<label
				htmlFor={props.id}
				className={`input-base flex items-center justify-between bg-weak-100 cursor-pointer ${className}`}
			>
				{selectedFile
					? selectedFile.name
					: `Upload Your ${switchInput(accept)}`}
				<img
					src="/upload.svg"
					alt="an upload button"
					className="w-6 h-6"
				/>
			</label>
		</div>
	);
};
