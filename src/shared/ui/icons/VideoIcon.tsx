interface VideoIconProps {
	color: "white" | "black";
	className?: string;
}

export const VideoIcon = ({ color, className }: VideoIconProps) => {
	const strokeColor = color === "black" ? "#202126" : "#ffffff";
	return (
		<svg
			role="img"
			aria-label="a video player"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
		>
			<path
				d="M18.3327 12.5013V7.5013C18.3327 3.33464 16.666 1.66797 12.4993 1.66797H7.49935C3.33268 1.66797 1.66602 3.33464 1.66602 7.5013V12.5013C1.66602 16.668 3.33268 18.3346 7.49935 18.3346H12.4993C16.666 18.3346 18.3327 16.668 18.3327 12.5013Z"
				stroke={strokeColor}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M2.09961 5.92578H17.8996"
				stroke={strokeColor}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M7.09961 1.75781V5.80781"
				stroke={strokeColor}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M12.9004 1.75781V5.43281"
				stroke={strokeColor}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M8.125 12.0421V11.0421C8.125 9.75875 9.03333 9.23376 10.1417 9.87542L11.0083 10.3754L11.875 10.8754C12.9833 11.5171 12.9833 12.5671 11.875 13.2088L11.0083 13.7088L10.1417 14.2088C9.03333 14.8504 8.125 14.3254 8.125 13.0421V12.0421V12.0421Z"
				stroke={strokeColor}
				strokeWidth="1.5"
				strokeMiterlimit="10"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
