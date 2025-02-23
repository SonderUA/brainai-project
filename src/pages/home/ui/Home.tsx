import { HomeButton } from "./HomeButton";
import { HomeBox } from "./HomeBox";
import { HomeLink } from "./HomeLink";
import { linkElements, boxElements, communityImages } from "../config";

export default function Home() {
	return (
		<div>
			<section className="flex flex-col items-center w-full pt-10 bg-[url(/home/background.png)] rounded-2xl bg-no-repeat bg-cover h-90">
				<h2 className="text-[2.125rem] font-semibold text-white-500">
					Make Your Ideas Happen
				</h2>
				<p className="text-white-500 mb-7.5">
					One platform, infinite possibilities
				</p>
				<HomeButton />
				<div className="flex max-lg-laptop:justify-center max-lg-laptop:gap-8 lg-laptop:justify-around mt-7.5 w-full">
					{boxElements.map((boxElement, idx) => {
						return (
							<HomeBox
								key={idx}
								text={boxElement.text}
								img={boxElement.img}
								className={boxElement.className}
							/>
						);
					})}
				</div>
			</section>
			<section className="flex flex-col gap-2.5 mt-25">
				<h3 className="font-medium">Most Uses</h3>
				<div className="grid grid-cols-3 gap-4 max-sm-tablet:grid-cols-1 max-sm-tablet:[&>*:nth-child(n+4)]:hidden max-lg-laptop:grid-cols-2">
					{linkElements.map((linkElement, idx) => (
						<HomeLink
							key={idx}
							href={linkElement.href}
							text={linkElement.text}
							amount={linkElement.amount}
						/>
					))}
				</div>
			</section>
			<section className="flex flex-col gap-2.5 mt-5">
				<h3 className="font-medium">Get inspired from Community</h3>
				<div className="max-sm-tablet:columns-1 max-lg-laptop:columns-2 lg-laptop:columns-3 desktop:columns-4 [column-gap:1em]">
					{communityImages.map((img, idx) => (
						<img
							key={idx}
							src={img.src}
							alt={img.alt}
							className="rounded-md break-inside-avoid my-4 w-full object-cover first:mt-0"
						/>
					))}
					{communityImages.map((img, idx) => (
						<img
							key={idx}
							src={img.src}
							alt={img.alt}
							className="rounded-md break-inside-avoid my-4 w-full object-cover"
						/>
					))}
				</div>
			</section>
		</div>
	);
}
