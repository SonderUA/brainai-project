interface NextIconProps {
	active: boolean;
	rotate?: boolean;
}

export const NextIcon = ({ active, rotate = false }: NextIconProps) => {
	return (
		<svg
			role="img"
			aria-label="a right facing arrow"
			className={`w-6 h-6 ${rotate ? "rotate-180" : ""}`}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g id="Breadcrumb Icon">
				<rect
					x="0.5"
					y="0.5"
					width="23"
					height="23"
					rx="5.5"
					stroke="#CDD0D5"
				/>
				<path
					id="Vector"
					d="M9 6L15 12L9 18"
					stroke={active ? "#202126" : "#CDD0D5"}
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</g>
		</svg>
	);
};
