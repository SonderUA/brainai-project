import { Navbar } from "./Navbar";
import { Profile } from "./Profile";
export const Sidebar = () => {
	return (
		<aside className="flex lg-tablet:flex-col gap-6 flex-shrink-0">
			<div className="flex flex-col gap-6 flex-shrink-0">
				<h1>
					<img
						src="/sidebar/logo.svg"
						alt="a company logo"
						className="[10.75rem] h-9"
					/>
				</h1>
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
			</div>
			<Navbar />
		</aside>
	);
};
