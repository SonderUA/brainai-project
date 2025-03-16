import { prisma } from "@/prisma";

/**
 * Creates a new article for a given user.
 *
 * @param {string} userID - The unique identifier of the user creating the article.
 * @param {Object} data - The article data.
 * @param {string} data.title - The title of the article.
 * @param {string} data.content - The content of the article.
 * @param {string} data.prompt - The prompt used to generate the article.
 * @param {string} data.type - The type of the article.
 * @returns {Promise<import("@prisma/client").Article>} A promise that resolves to the created article.
 */
export async function createArticle(
	userID: string,
	data: {
		title: string;
		content: string;
		prompt: string;
		type: string;
	}
): Promise<import("@prisma/client").Article> {
	return await prisma.article.create({
		data: {
			...data,
			user: {
				connect: { id: userID },
			},
		},
	});
}

/**
 * Retrieves an article by its unique identifier.
 *
 * @param {string} id - The unique identifier of the article.
 * @returns {Promise<import("@prisma/client").Article | null>} A promise that resolves to the article if found, or null otherwise.
 */
export async function getArticleById(
	id: string
): Promise<import("@prisma/client").Article | null> {
	return await prisma.article.findUnique({ where: { id } });
}

/**
 * Updates an existing article with new data.
 *
 * @param {string} id - The unique identifier of the article to update.
 * @param {Partial<{ title: string; content: string; prompt: string; type: string }>} data - An object containing the fields to update.
 * @returns {Promise<import("@prisma/client").Article>} A promise that resolves to the updated article.
 */
export async function updateArticle(
	id: string,
	data: Partial<{
		title: string;
		content: string;
		prompt: string;
		type: string;
	}>
): Promise<import("@prisma/client").Article> {
	return await prisma.article.update({
		where: { id },
		data,
	});
}

/**
 * Deletes an article by its unique identifier.
 *
 * @param {string} id - The unique identifier of the article to delete.
 * @returns {Promise<import("@prisma/client").Article>} A promise that resolves to the deleted article.
 */
export async function deleteArticle(
	id: string
): Promise<import("@prisma/client").Article> {
	return await prisma.article.delete({ where: { id } });
}
