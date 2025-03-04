interface DocumentIconProps {
	className?: string;
}

export const DocumentIcon = ({ className }: DocumentIconProps) => {
	return (
		<svg
			role="img"
			aria-label="a document"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			viewBox="0 0 20 20"
			fill="none"
		>
			<path
				d="M18.3346 8.33366V12.5003C18.3346 16.667 16.668 18.3337 12.5013 18.3337H7.5013C3.33464 18.3337 1.66797 16.667 1.66797 12.5003V7.50033C1.66797 3.33366 3.33464 1.66699 7.5013 1.66699H11.668"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M18.3346 8.33366H15.0013C12.5013 8.33366 11.668 7.50033 11.668 5.00033V1.66699L18.3346 8.33366Z"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M5.83203 10.833H10.832"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M5.83203 14.167H9.16536"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
