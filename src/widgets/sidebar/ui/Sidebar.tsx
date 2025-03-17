import { Navbar } from "./Navbar";
import { NavbarMobile } from "./NavbarMobile";
import { Profile } from "./Profile";
import { User } from "@prisma/client";
import { auth } from "@/server/features/auth/nextauth.config";

export const Sidebar = async () => {
	const session = await auth();

	let user: User | null = null;
	if (session?.user?.id) {
		const response = await fetch(
			`/api/user?id=${encodeURIComponent(session.user.id)}`
		);
		user = await response.json();
	}

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
				<Profile
					username={user?.name ? user.name : "Guest"}
					tokens={user ? user.tokens : 0}
					plan="personal"
					img={
						<img
							src={
								user && user.image
									? user.image
									: "/sidebar/white.svg"
							}
							alt="user picture"
							className="w-9 h-9 rounded-4xl"
						/>
					}
					className="hidden sm-tablet:flex"
				/>
			</div>
			<Profile
				username={user?.name ? user.name : "Guest"}
				tokens={user ? user.tokens : 0}
				plan="personal"
				img={
					<img
						src={
							user && user.image
								? user.image
								: "/sidebar/white.svg"
						}
						alt="user picture"
						className="w-9 h-9 rounded-4xl"
					/>
				}
				className="sm-tablet:hidden"
			/>
			<Navbar />
			<NavbarMobile />
		</aside>
	);
};
