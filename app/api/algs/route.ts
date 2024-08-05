import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  try {
    const algorithms = await prisma.algorithm.findMany({
      where: { type: category || undefined },
    });
    return NextResponse.json(algorithms);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch algorithms" },
      { status: 500 },
    );
  }
}
