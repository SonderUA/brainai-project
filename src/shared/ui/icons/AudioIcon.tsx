interface AudioIconProps {
	className?: string;
}

export const AudioIcon = ({ className }: AudioIconProps) => {
	return (
		<svg
			role="img"
			aria-label="a musical note"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			viewBox="0 0 21 20"
			fill="none"
		>
			<path
				d="M5.56484 18.3338C7.00078 18.3338 8.16484 17.1697 8.16484 15.7338C8.16484 14.2978 7.00078 13.1338 5.56484 13.1338C4.1289 13.1338 2.96484 14.2978 2.96484 15.7338C2.96484 17.1697 4.1289 18.3338 5.56484 18.3338Z"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M17.6974 14V3.83329C17.6974 1.66662 16.3391 1.36662 14.9641 1.74162L9.76406 3.15829C8.81406 3.41662 8.16406 4.16662 8.16406 5.24996V7.05829V8.27496V15.725"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M15.1 16.6004C16.5359 16.6004 17.7 15.4363 17.7 14.0004C17.7 12.5644 16.5359 11.4004 15.1 11.4004C13.6641 11.4004 12.5 12.5644 12.5 14.0004C12.5 15.4363 13.6641 16.6004 15.1 16.6004Z"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M8.16406 7.93301L17.6974 5.33301"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
