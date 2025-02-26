import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Not logged in" }, { status: 401 });
  }

  const requests = await prisma.teacherRequests.findMany();
  console.log(requests)
  return NextResponse.json(requests);
}