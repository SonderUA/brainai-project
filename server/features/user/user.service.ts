import { prisma } from "@/prisma";

export async function getUserById(id: string) {
	return await prisma.user.findUnique({ where: { id } });
}

export async function updateUser(
	id: string,
	data: Partial<{ name: string; email: string; password: string }>
) {
	return await prisma.user.update({ where: { id }, data });
}

export async function deleteUser(id: string) {
	return await prisma.user.delete({ where: { id } });
}
