import { handleCreateArticle } from "@/server/features/article/article.controller";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const formData = await request.formData();
	const userID = formData.get("userID") as string | null;
	const file = formData.get("file") as File | null;
	const weblink = formData.get("weblink") as string | null;
	const textarea = formData.get("textarea") as string | null;
	const language = formData.get("language") as string | null;
	const length = formData.get("length") as string | null;
	const style = formData.get("style") as string | null;

	const input = (file?.size && file) || textarea || weblink;
	const source = file?.size ? "local" : weblink ? "weblink" : "prompt";

	if (!userID || !language || !length || !style || !source || !input) {
		return NextResponse.json(
			{ error: "Missing required fields" },
			{ status: 400 }
		);
	}

	return await handleCreateArticle({
		userID: userID as string,
		language: language as string,
		length: length as string,
		style: style as string,
		source,
		input: input as string | File,
	});
}
