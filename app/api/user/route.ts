import { NextRequest } from "next/server";
import { prisma } from "@/prisma";

export async function GET(request: NextRequest) {
	const userEmail = request.nextUrl.searchParams.get("email");

	if (!userEmail) {
		return new Response("Missing required parameter in the URL", {
			status: 400,
		});
	}

	const user = await prisma.user.findMany({
		where: {
			email: userEmail,
		},
	});

	if (!user) {
		return new Response("User is not logged in", { status: 400 });
	}

	return new Response(JSON.stringify(user), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}
