import React from "react";

export const formatBreadcrumb = (path: string): React.ReactNode => {
	if (!path || path === "/") return "Home";
	if (path === "/whats-new") return "What's new";
	if (path === "/api-access") return "API Access";
	if (path === "/faq-and-help") return "FAQ & Help";

	// Remove the leading slash and split by "/"
	const segments = path.slice(1).split("/");

	// Replace hyphens with spaces for each segment
	const formattedSegments = segments.map((segment) =>
		segment.split("-").join(" ")
	);

	// Build an array of React nodes, interleaving segments and the icon
	const breadcrumbNodes: React.ReactNode[] = [];
	formattedSegments.forEach((segment, idx) => {
		breadcrumbNodes.push(
			<span key={`seg-${idx}`} className="capitalize">
				{segment}
			</span>
		);

		// Insert the SVG separator if not the last segment
		if (idx < formattedSegments.length - 1) {
			breadcrumbNodes.push(
				<img
					src="/next.svg"
					key={`icon-${idx}`}
					alt="a next icon"
					className="w-4 h-4"
				/>
			);
		}
	});

	return breadcrumbNodes;
};
