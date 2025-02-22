import { Fragment } from "react";
import { Navlink } from "@/src/shared/ui";
import { MainLinks } from "../config";
import Link from "next/link";

export const Navbar = () => {
	return (
		<nav className="flex flex-col w-full">
			{MainLinks.map((group, groupIndex) => (
				<Fragment key={groupIndex}>
					<ul className="font-{--font-roboto}">
						{group.map((link, index) => (
							<li key={index}>
								<Navlink
									href={link.href}
									text={link.text}
									svg={link.svg}
								/>
							</li>
						))}
					</ul>
					<hr className="my-2.5 border-t border-dashed border-disabled-100" />
				</Fragment>
			))}
			<footer>
				<div className="flex justify-between mb-3.5">
					<Link href="#">Terms</Link>
					<span>•</span>
					<Link href="#">DMCA</Link>
					<span>•</span>
					<Link href="#">Affiliates</Link>
				</div>
				<div className="flex justify-between">
					<Link href="https://www.facebook.com">
						<img
							src="/sidebar/facebook.svg"
							alt="a facebook logo"
							className="w-5 h-5"
						/>
					</Link>
					<Link href="https://www.blogger.com">
						<img
							src="/sidebar/blogger.svg"
							alt="a blogger logo"
							className="w-5 h-5"
						/>
					</Link>
					<Link href="https://www.messenger.com">
						<img
							src="/sidebar/messenger.svg"
							alt="a messenger logo"
							className="w-5 h-5"
						/>
					</Link>
					<Link href="https://www.youtube.com">
						<img
							src="/sidebar/youtube.svg"
							alt="a youtube logo"
							className="w-5 h-5"
						/>
					</Link>
					<Link href="https://www.whatsapp.com">
						<img
							src="/sidebar/whatsapp.svg"
							alt="a whatsapp logo"
							className="w-5 h-5"
						/>
					</Link>
				</div>
			</footer>
		</nav>
	);
};
