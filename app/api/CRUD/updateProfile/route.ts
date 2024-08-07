import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  try {
    const { userId, name, email, address, country } = await req.json();
    console.log("Updating user: ", { userId, name, email, address, country });

    if (!name || !email == undefined) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: {
        name,
        email,
      },
      select: {
        id: true,
        user_id: true,
        name: true,
        email: true,
      },
    });

    console.log("Updated user:", updatedUser);

    const userWithConvertedId = {
      ...updatedUser,
      id: updatedUser.id.toString(),
    };

    return NextResponse.json(
      {
        message: "User profile is updated successfully",
        user: userWithConvertedId,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating user profile: ", error);
    return NextResponse.json(
      { message: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
