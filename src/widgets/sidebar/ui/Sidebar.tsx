"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Navbar } from "./Navbar";
import { NavbarMobile } from "./NavbarMobile";
import { Profile } from "./Profile";
import { useWindowWidth } from "@/src/shared/hooks";

export const Sidebar = () => {
	const windowWidth = useWindowWidth();
	const [tokens, setTokens] = useState<number | null>(null);
	const [loading, setLoading] = useState(true);
	const session = useSession();

	useEffect(() => {
		async function fetchUser(email: string | null | undefined) {
			if (!email) {
				setTokens(0);
				setLoading(false);
				return;
			}
			try {
				const response = await fetch(
					`/api/user?email=${encodeURIComponent(email)}`
				);
				if (!response.ok) {
					throw new Error(`Error: ${response.statusText}`);
				}
				const result = await response.json();
				console.log(result?.tokens);
				setTokens(result?.tokens ?? 0);
			} catch (error) {
				console.error("Failed to fetch user:", error);
				setTokens(0);
			} finally {
				setLoading(false);
			}
		}
		const email = session?.data?.user?.email;
		fetchUser(email);
	}, [session?.data?.user?.email]);
	return (
		<aside className="flex flex-col gap-6 flex-shrink-0">
			<div className="flex max-lg-tablet:items-center lg-tablet:flex-col gap-6 flex-shrink-0 max-sm-tablet:justify-between">
				<h1 className="flex flex-shrink-0">
					<img
						src="/sidebar/logo.svg"
						alt="a company logo"
						className="w-[10.75rem] h-9"
					/>
				</h1>
				{windowWidth >= 672 && (
					<Profile
						username={
							session.status === "loading"
								? "Loading..."
								: session?.data?.user?.name ?? "Guest"
						}
						tokens={loading ? 0 : tokens!}
						plan="personal"
						img={
							<img
								src={
									session?.data?.user?.image ??
									"/sidebar/white.svg"
								}
								alt="user picture"
								className="w-9 h-9 rounded-4xl"
							/>
						}
					/>
				)}
			</div>

			{windowWidth < 672 && (
				<Profile
					username={
						session.status === "loading"
							? "Loading..."
							: session?.data?.user?.name ?? "Guest"
					}
					tokens={loading ? 0 : tokens!}
					plan="personal"
					img={
						<img
							src={
								session?.data?.user?.image ??
								"/sidebar/white.svg"
							}
							alt="user picture"
							className="w-9 h-9 rounded-4xl"
						/>
					}
				/>
			)}
			{windowWidth >= 800 ? <Navbar /> : <NavbarMobile />}
		</aside>
	);
};
