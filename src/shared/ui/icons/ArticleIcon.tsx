interface ArticleIconProps {
	className?: string;
}

export const ArticleIcon = ({ className }: ArticleIconProps) => {
	return (
		<svg
			role="img"
			aria-label="a pen"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			viewBox="0 0 20 20"
			fill="none"
		>
			<path
				d="M9.16602 1.66797H7.49935C3.33268 1.66797 1.66602 3.33464 1.66602 7.5013V12.5013C1.66602 16.668 3.33268 18.3346 7.49935 18.3346H12.4993C16.666 18.3346 18.3327 16.668 18.3327 12.5013V10.8346"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M13.3675 2.51639L6.80088 9.08306C6.55088 9.33306 6.30088 9.82472 6.25088 10.1831L5.89254 12.6914C5.75921 13.5997 6.40088 14.2331 7.30921 14.1081L9.81754 13.7497C10.1675 13.6997 10.6592 13.4497 10.9175 13.1997L17.4842 6.63306C18.6175 5.49972 19.1509 4.18306 17.4842 2.51639C15.8175 0.849722 14.5009 1.38306 13.3675 2.51639Z"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeMiterlimit="10"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M12.4258 3.45703C12.9841 5.4487 14.5424 7.00703 16.5424 7.5737"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeMiterlimit="10"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
