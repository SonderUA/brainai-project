import { Fragment } from "react";
import { Navlink } from "@/src/shared/ui";
import { MainLinks } from "../config";
import { Footer } from "./Footer";

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
			<Footer />
		</nav>
	);
};
