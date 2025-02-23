import type { Metadata } from "next";
import "@/src/app/styles";
import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import { Sidebar } from "@/src/widgets/sidebar";
import { Providers } from "../provider";
import { Navigation } from "@/src/shared/ui";

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
				<div className="flex h-auto gap-6 p-6 min-h-screen flex-col lg-tablet:flex-row">
					<Sidebar />
					<Providers>
						<main className="flex flex-col flex-grow p-5 gap-5 bg-white-500 rounded-2xl min-h-full border border-disabled-100">
							<Navigation />
							{children}
						</main>
					</Providers>
				</div>
			</body>
		</html>
	);
}

export function StorybookLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="antialiased bg-weak-100">
			<div className="flex h-auto gap-6 p-6 min-h-screen flex-col lg-tablet:flex-row">
				<Sidebar />
				<Providers>
					<main className="flex flex-col flex-grow p-5 gap-5 bg-white-500 rounded-2xl min-h-full border border-disabled-100">
						<Navigation />
						{children}
					</main>
				</Providers>
			</div>
		</div>
	);
}
