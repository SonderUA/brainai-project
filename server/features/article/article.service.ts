import { prisma } from "@/prisma";

// TODO: add JSDoc documentation and implement all CRUD operations
export async function createArticle(
	userID: string,
	data: {
		title: string;
		content: string;
		prompt: string;
		type: string;
	}
) {
	return await prisma.article.create({
		data: {
			...data,
			user: {
				connect: { id: userID },
			},
		},
	});
}
