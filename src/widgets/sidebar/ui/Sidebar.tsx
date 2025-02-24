"use client";
import { Navbar } from "./Navbar";
import { NavbarMobile } from "./NavbarMobile";
import { Profile } from "./Profile";
import { useWindowWidth } from "@/src/shared/hooks";

export const Sidebar = () => {
	const windowWidth = useWindowWidth();

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
						username="uisaleh"
						tokens={100}
						plan="personal"
						img={
							<img
								src="/sidebar/user.svg"
								alt="user picture"
								className="w-9 h-9"
							/>
						}
					/>
				)}
			</div>

			{windowWidth < 672 && (
				<Profile
					username="uisaleh"
					tokens={100}
					plan="personal"
					img={
						<img
							src="/sidebar/user.svg"
							alt="user picture"
							className="w-9 h-9"
						/>
					}
				/>
			)}
			{windowWidth >= 800 ? <Navbar /> : <NavbarMobile />}
		</aside>
	);
};
