"use client";
import { FormEvent, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/src/app/store";
import { useSession } from "next-auth/react";

export function useArticleFormHandler() {
	const { data: session } = useSession();
	const articleForm = useSelector((state: RootState) => state.articleForm);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSubmit = useCallback(
		async (event: FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			if (!session) {
				setErrorMessage(
					"You need to be logged in to generate an article"
				);
				return;
			}

			const userID = session.user?.id as string;
			const formData = new FormData(event.currentTarget);

			const file = formData.get("file") as File | null;
			const weblink = formData.get("weblink") as string | null;
			const textarea = formData.get("textarea") as string | null;

			// Determine input and source based on provided fields
			const input = file?.size ? file : textarea || weblink;
			const source = file?.size
				? "local"
				: weblink
				? "weblink"
				: "prompt";

			if (
				!userID ||
				!articleForm.selects[0].value ||
				!articleForm.selects[1].value ||
				!articleForm.selects[2].value ||
				!source ||
				!input
			) {
				setErrorMessage("Missing required fields");
				return;
			}

			formData.append("userID", userID);
			formData.append("language", articleForm.selects[0].value);
			formData.append("length", articleForm.selects[1].value);
			formData.append("style", articleForm.selects[2].value);
			formData.append("source", source);
			formData.append("input", input as string | File);

			try {
				setIsLoading(true);
				const res = await fetch("/api/articles", {
					method: "POST",
					body: formData,
				});
				if (res.ok) {
					const data = await res.json();
					console.log("Server response:", data);
					setErrorMessage("");
				} else {
					const error = await res.json();
					setErrorMessage(
						error.error || "An unexpected error occurred"
					);
				}
			} catch (error) {
				console.error("Error submitting form:", error);
				setErrorMessage(
					"Error submitting form. Please try again later."
				);
			} finally {
				setIsLoading(false);
			}
		},
		[articleForm, session]
	);

	return { handleSubmit, errorMessage, isLoading, setErrorMessage };
}
