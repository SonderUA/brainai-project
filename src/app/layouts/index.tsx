import type { Metadata } from "next";
import "@/src/app/styles";
import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const roboto = Roboto({
	variable: "--font-roboto",
	subsets: ["latin"],
	weight: "500",
});

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
			<body
				className={`${inter.variable} ${roboto.variable} antialiased bg-weak-100`}
			>
				{children}
			</body>
		</html>
	);
}
