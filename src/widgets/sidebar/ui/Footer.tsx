import Link from "next/link";
import { FooterLinks } from "../config";
import { Fragment } from "react";

interface FooterProps {
	className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
	const links = ["Terms", "DMCA", "Affiliates"];
	return (
		<footer className={className}>
			<div className="flex justify-between max-lg-mobile:justify-around mb-3.5">
				{links.map((link, idx) => (
					<Fragment key={idx}>
						<Link href="#" className="max-lg-mobile:text-lg">
							{link}
						</Link>
						{idx !== 2 && (
							<span className="max-lg-mobile:text-lg">•</span>
						)}
					</Fragment>
				))}
			</div>
			<div className="flex justify-between max-lg-mobile:justify-around">
				{FooterLinks.map((link) => (
					<Link key={link.href} href={link.href}>
						<img
							src={link.src}
							alt={link.alt}
							className="w-5 h-5 max-lg-mobile:w-5.5 max-lg-mobile:h-5.5"
						/>
					</Link>
				))}
			</div>
		</footer>
	);
};
