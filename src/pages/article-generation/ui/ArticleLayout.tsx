"use client";
import { Button, Navlink, Select } from "@/src/shared/ui";
import { selectData, articleLinks } from "../config";
import { capitalize } from "@/src/shared/lib";
import { updateSelectOption } from "../model/articleFormSlice";
import { useArticleFormHandler } from "../hooks/useArticleFormHandler";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/src/app/store";
import { ArticleError } from "./ArticleError";

export default function ArticleLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { handleSubmit, errorMessage, isLoading, setErrorMessage } =
		useArticleFormHandler();
	const dispatch = useDispatch<AppDispatch>();
	const articleForm = useSelector((state: RootState) => state.articleForm);

	return (
		<div className="flex flex-col gap-5 relative">
			<section className="flex flex-col gap-5 text-neutral-500 items-center font-{--font-roboto} max-w-3xl mx-auto w-full z-0">
				<div className="text-center">
					<h2 className="text-2xl font-semibold">
						New Article Generation
					</h2>
					<p className="text-sm">
						Start by selecting a source, then choose how you want to
						create your article.
					</p>
				</div>
				<nav className="w-full p-[0.3125rem] bg-weak-100 border-disabled-100 border rounded-xl">
					<ul className="flex gap-2.5">
						{articleLinks.map((articleLink, idx) => (
							<li className="flex-grow" key={idx}>
								<Navlink
									text={capitalize(articleLink.text)}
									href={`/article-generation/${articleLink.text}`}
									svg={articleLink.svg}
									main={false}
									center
								/>
							</li>
						))}
					</ul>
				</nav>
				<form
					className="flex flex-col gap-5 w-full"
					onSubmit={handleSubmit}
					encType="multipart/form-data"
					noValidate
				>
					<div
						className={`transition-all duration-300 ease-in-out rounded-lg flex border-2 ${
							errorMessage
								? "border-purple-300"
								: "border-transparent"
						}`}
						onClick={() => setErrorMessage("")}
					>
						{children}
					</div>

					<ArticleError
						errorMessage={errorMessage}
						onClose={() => setErrorMessage("")}
					/>
					<div className="grid w-full gap-x-6 gap-y-5 grid-cols-2">
						{selectData.map((data, idx) => (
							<Select
								id={data.id}
								key={idx}
								label={data.label}
								options={data.options}
								selectedOption={articleForm.selects[idx]}
								onSelect={(option) =>
									dispatch(
										updateSelectOption({
											index: idx,
											value: option,
										})
									)
								}
							/>
						))}
					</div>
					<Button
						intent="primary"
						size="large"
						className="w-full justify-center"
						label="Generate Article by 15 Tokens"
						svg={
							<img
								src="/sidebar/tokens.svg"
								alt="tokens"
								className="w-5 h-5"
							/>
						}
					/>
				</form>
				<p className="text-xs text-center text-neutral-200 -mt-2">
					<b className="text-xs">Note</b>: Images, videos, audios, and
					documents will get turned into a prompt
				</p>
			</section>
		</div>
	);
}
