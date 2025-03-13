// components/ErrorDisplay.tsx
import React from "react";

interface ArticleErrorProps {
	errorMessage: string;
	onClose?: () => void;
}

export const ArticleError = ({ errorMessage, onClose }: ArticleErrorProps) => {
	return (
		<span
			className={`transition-all duration-500 ease-in-out text-xs text-purple-600 ${
				errorMessage
					? "opacity-100 translate-y-0 -mt-2"
					: "opacity-0 -translate-y-2 -mt-4 h-0 overflow-hidden"
			}`}
			role="alert"
			onClick={onClose}
		>
			{errorMessage}
		</span>
	);
};
