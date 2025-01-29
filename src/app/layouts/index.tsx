import type { Metadata } from "next";
import "@/src/app/styles";

export const metadata: Metadata = {
	title: "BrainAI",
	description:
		"BrainAI is a web application that uses machine learning to generate different articles, images, and videos.",
};

export function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
