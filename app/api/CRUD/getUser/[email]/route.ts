import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { email: string } },
) {
  const { email } = params;

  try {
    if (typeof email !== "string") {
      throw new Error("Invalid email");
    }

    const user = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        user_id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const serializedUser = {
      ...user,
      id: user.id.toString(),
    };

    return NextResponse.json(serializedUser, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Error fetching user", details: error.message },
      { status: 500 },
    );
  }
}
