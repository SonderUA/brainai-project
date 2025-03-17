import Link from "next/link";

interface ProfileProps {
	username: string;
	tokens: number;
	plan: string;
	img?: React.ReactElement;
	className?: string;
}

export const Profile: React.FC<ProfileProps> = ({
	username,
	tokens,
	plan,
	img,
	className,
}) => {
	return (
		<section
			className={`flex max-lg-tablet:justify-between max-lg-tablet:w-full lg-tablet:flex-col p-2.5 rounded-lg gap-2.5 bg-primary-gradient w-fit ${className}`}
		>
			<div className="flex gap-2.5 items-center">
				{img}
				<div className="flex flex-col text-white-500">
					<h3 className="text-lg font-bold">{username}</h3>
					<p className="text-xs -mt-1 capitalize">{plan}</p>
				</div>
			</div>
			<div className="flex items-center gap-2.5">
				<div className="flex items-center gap-0.5 flex-shrink-0">
					<img
						src="/sidebar/tokens.svg"
						alt="tokens"
						className="w-5 h-5"
					/>
					<p className="text-white-500 text-sm lg-tablet:text-xs tracking-wide">
						Tokens {tokens}/45
					</p>
				</div>
				<Link
					href="/premium-plans"
					className="py-1.5 px-2 lg-tablet:py-1 lg-tablet:px-1.5 rounded-full bg-white-500 text-xs"
				>
					<span className="bg-primary-gradient bg-clip-text text-transparent text-sm lg-tablet:text-xs">
						Upgrades
					</span>
				</Link>
			</div>
		</section>
	);
};
