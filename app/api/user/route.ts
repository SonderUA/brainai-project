import { NextRequest, NextResponse } from "next/server";
import {
	handleGetUser,
	handleUpdateUser,
	handleDeleteUser,
} from "@/server/features/user/user.controller";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");
	if (!id) {
		return NextResponse.json(
			{ error: "User id is required" },
			{ status: 400 }
		);
	}
	return await handleGetUser(id);
}

export async function PUT(request: NextRequest) {
	const data = await request.json();
	const { id, ...updateData } = data;

	if (!id) {
		return NextResponse.json(
			{ error: "User id is required for update" },
			{ status: 400 }
		);
	}

	return await handleUpdateUser(id, updateData);
}

export async function DELETE(request: NextRequest) {
	const id = request.nextUrl.searchParams.get("id");

	if (!id) {
		return NextResponse.json(
			{ error: "User id is required" },
			{ status: 400 }
		);
	}

	return await handleDeleteUser(id);
}
