interface ImageIconProps {
	color: "white" | "black";
	className?: string;
}

export const ImageIcon = ({ color, className }: ImageIconProps) => {
	const strokeColor = color === "black" ? "#202126" : "#ffffff";
	return (
		<svg
			role="img"
			aria-label="an image"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			viewBox="0 0 20 20"
			fill="none"
		>
			<path
				d="M7.50065 8.33333C8.42113 8.33333 9.16732 7.58714 9.16732 6.66667C9.16732 5.74619 8.42113 5 7.50065 5C6.58018 5 5.83398 5.74619 5.83398 6.66667C5.83398 7.58714 6.58018 8.33333 7.50065 8.33333Z"
				stroke={strokeColor}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M10.8327 1.66797H7.49935C3.33268 1.66797 1.66602 3.33464 1.66602 7.5013V12.5013C1.66602 16.668 3.33268 18.3346 7.49935 18.3346H12.4993C16.666 18.3346 18.3327 16.668 18.3327 12.5013V8.33464"
				stroke={strokeColor}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M13.125 4.16797H17.7083"
				stroke={strokeColor}
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<path
				d="M15.416 6.45833V1.875"
				stroke={strokeColor}
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<path
				d="M2.22461 15.7898L6.33294 13.0315C6.99128 12.5898 7.94128 12.6398 8.53294 13.1482L8.80794 13.3898C9.45794 13.9482 10.5079 13.9482 11.1579 13.3898L14.6246 10.4148C15.2746 9.85651 16.3246 9.85651 16.9746 10.4148L18.3329 11.5815"
				stroke={strokeColor}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
