import { redirect } from "next/navigation";

export default function ArticlePage() {
	redirect("/article-generation/prompt");
	return null;
}
