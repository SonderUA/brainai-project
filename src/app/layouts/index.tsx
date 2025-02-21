import type { Metadata } from "next";
import "@/src/app/styles";
import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import { Sidebar } from "@/src/widgets/sidebar";

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
				<div className="flex h-auto gap-6 p-6 min-h-screen flex-col md:flex-row">
					<Sidebar />
					<main className="flex flex-col flex-grow p-5 gap-5 bg-white-500 rounded-2xl min-h-full border border-disabled-100">
						{children}
					</main>
				</div>
			</body>
		</html>
	);
}
