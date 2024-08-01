import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const algorithms = await prisma.algorithm.findMany();
    return NextResponse.json(algorithms);
  } catch (error) {
    return NextResponse.error();
  }
}
