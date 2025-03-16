import { NextResponse } from "next/server";
import { getUserById, updateUser, deleteUser } from "./user.service";

/**
 * Handles user retrieval by their unique identifier.
 *
 * @param {string} id - The unique identifier of the user.
 * @returns {Promise<NextResponse>} A JSON response containing the user data if found, or an error message with the appropriate HTTP status code.
 */
export async function handleGetUser(id: string): Promise<NextResponse> {
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

/**
 * Handles user information renewal.
 *
 * @param {string} id - The unique identifier of the user to update.
 * @param {any} updateData - An object containing the fields to update.
 * @returns {Promise<NextResponse>} A JSON response containing the updated user data if the update is successful, or an error message with the appropriate HTTP status code.
 */
export async function handleUpdateUser(
	id: string,
	updateData: any
): Promise<NextResponse> {
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

/**
 * Handles user deletion by their unique identifier.
 *
 * @param {string} id - The unique identifier of the user to delete.
 * @returns {Promise<NextResponse>} A JSON response with a success message if the deletion is successful, or an error message with the appropriate HTTP status code.
 */
export async function handleDeleteUser(id: string): Promise<NextResponse> {
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
