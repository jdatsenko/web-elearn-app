import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Not logged in" }, { status: 401 });
  }
  const userId = session.user.id;

  const solvedTests = await prisma.solvedTest.findMany({
    where: {
      userId: userId,
    },
  });

  return NextResponse.json(solvedTests);
}
