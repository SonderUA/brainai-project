"use client";
import Image from "next/image";
import TokensImage from "@/public/tokens.svg";
import ArrowDown from "@/public/down-icon.svg";

interface ProfileProps {
	username: string;
	tokens: number;
	plan: string;
	img?: React.ReactElement;
}

export const Profile = ({ username, tokens, plan, img }: ProfileProps) => {
	return (
		<section className="flex flex-col p-2.5 rounded-lg gap-2.5 bg-primary-gradient w-fit">
			<div className="flex justify-between items-center">
				<div className="flex gap-2.5 items-center">
					{img}
					<div className="flex flex-col text-white-500">
						<h3 className="text-lg font-bold">{username}</h3>
						<p className="text-xs -mt-1 capitalize">{plan}</p>
					</div>
				</div>
				<button aria-label="Toggle dropdown" className="sm:hidden">
					<img
						src="/down-icon.svg"
						alt="a dropdown"
						className="w-6 h-6"
					/>
				</button>
			</div>
			<div className="flex items-center gap-2.5">
				<div className="flex items-center gap-0.5 flex-shrink-0">
					<img src="/tokens.svg" alt="tokens" className="w-5 h-5" />
					<p className="text-white-500 text-xs tracking-wide">
						Tokens {tokens}/45
					</p>
				</div>
				<button className="py-1 px-1.5 rounded-full bg-white-500 text-xs">
					<span className="bg-primary-gradient bg-clip-text text-transparent">
						Upgrades
					</span>
				</button>
			</div>
		</section>
	);
};
