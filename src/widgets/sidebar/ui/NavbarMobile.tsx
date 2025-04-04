"use client";
import { useState } from "react";
import { Footer } from "./Footer";
import { MainLinks } from "../config";
import { AnimatePresence, motion } from "framer-motion";
import { Navlink } from "@/src/shared/ui";
import { cn } from "@/src/shared/lib/cn";

export const NavbarMobile = () => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const accordions = ["Dashboard", "My Account", "More"];

	const handleToggle = (index: number) => {
		setActiveIndex(activeIndex === index ? null : index);
	};

	return (
		<nav className="flex flex-col w-full gap-2 lg-tablet:hidden">
			<div className="flex w-full gap-2 items-center">
				{accordions.map((accordion, idx) => (
					<div
						className="flex flex-grow basis-20 flex-col min-w-fit"
						key={idx}
					>
						<button
							type="button"
							onClick={() => handleToggle(idx)}
							className="flex justify-between flex-grow gap-2 items-center w-full text-left font-medium pl-3 px-2 py-2.5 border border-neutral-500 rounded-lg text-nowrap"
						>
							{accordion}
							<img
								src="/sidebar/arrow-down.svg"
								alt="a dropdown arrow"
								className={cn(
									"w-4 h-2.5 transition-transform duration-500 ease-in-out",
									activeIndex === idx && "rotate-180"
								)}
							/>
						</button>
					</div>
				))}
				<Footer className="w-50 ml-2 hidden sm-tablet:block" />
			</div>
			<div className="overflow-hidden">
				<AnimatePresence>
					{activeIndex !== null && (
						<motion.ul
							className="font-{--font-roboto} pl-4"
							initial={{ height: 0, opacity: 0.5 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{
								duration: 0.5,
								ease: "easeInOut",
							}}
						>
							{MainLinks[activeIndex].map((link, idx) => (
								<li key={idx}>
									<Navlink
										href={link.href}
										text={link.text}
										svg={link.svg}
									/>
								</li>
							))}
						</motion.ul>
					)}
				</AnimatePresence>
			</div>
			<Footer className="w-3/5 mx-auto max-lg-mobile:w-full sm-tablet:hidden" />
		</nav>
	);
};
