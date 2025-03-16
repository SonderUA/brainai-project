import { prisma } from "@/prisma";

/**
 * Retrieves a user by their unique identifier.
 *
 * @param {string} id - The unique identifier of the user.
 * @returns {Promise<import("@prisma/client").User | null>} A promise that resolves to the user object if found, or null if not.
 */
export async function getUserById(
	id: string
): Promise<import("@prisma/client").User | null> {
	return await prisma.user.findUnique({ where: { id } });
}

/**
 * Updates a user's information.
 *
 * @param {string} id - The unique identifier of the user to update.
 * @param {Partial<{ name: string; email: string; password: string; tokens: number }>} data - An object containing the fields to update.
 * @returns {Promise<import("@prisma/client").User>} A promise that resolves to the updated user object.
 */
export async function updateUser(
	id: string,
	data: Partial<{
		name: string;
		email: string;
		password: string;
		tokens: number;
	}>
): Promise<import("@prisma/client").User> {
	return await prisma.user.update({ where: { id }, data });
}

/**
 * Deletes a user by their unique identifier.
 *
 * @param {string} id - The unique identifier of the user to delete.
 * @returns {Promise<import("@prisma/client").User>} A promise that resolves to the deleted user object.
 */
export async function deleteUser(
	id: string
): Promise<import("@prisma/client").User> {
	return await prisma.user.delete({ where: { id } });
}
