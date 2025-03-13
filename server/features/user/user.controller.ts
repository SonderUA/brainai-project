import { NextResponse } from "next/server";
import { getUserById, updateUser, deleteUser } from "./user.service";

// TODO: add JSDoc documentation
export async function handleGetUser(id: string) {
	try {
		const user = await getUserById(id);
		if (!user) {
			return NextResponse.json(
				{ error: "User not found" },
				{ status: 404 }
			);
		}
		return NextResponse.json(user);
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message || "Error fetching user" },
			{ status: 500 }
		);
	}
}

export async function handleUpdateUser(id: string, updateData: any) {
	try {
		const updatedUser = await updateUser(id, updateData);
		if (!updatedUser) {
			return NextResponse.json(
				{ error: "User not found" },
				{ status: 404 }
			);
		}
		return NextResponse.json(updatedUser);
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message || "Error updating user" },
			{ status: 500 }
		);
	}
}

export async function handleDeleteUser(id: string) {
	try {
		const deletedUser = await deleteUser(id);
		if (!deletedUser) {
			return NextResponse.json(
				{ error: "User not found" },
				{ status: 404 }
			);
		}
		return NextResponse.json(
			{ message: "User deleted successfully" },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message || "Error deleting user" },
			{ status: 500 }
		);
	}
}
