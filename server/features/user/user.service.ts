import { prisma } from "@/prisma";

// TODO: add JSDoc documentation
export async function getUserById(id: string) {
	return await prisma.user.findUnique({ where: { id } });
}

export async function updateUser(
	id: string,
	data: Partial<{
		name: string;
		email: string;
		password: string;
		tokens: number;
	}>
) {
	return await prisma.user.update({ where: { id }, data });
}

export async function deleteUser(id: string) {
	return await prisma.user.delete({ where: { id } });
}
