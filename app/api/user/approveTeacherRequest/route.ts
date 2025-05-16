import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const id = body.id;

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Musíte sa prihlásiť." }, { status: 401 });
  }

  if (session.user.role !== 'ADMIN') {
    return NextResponse.json({ message: "Not authorized as admin" }, { status: 401 });
  }

  const updatedRequest = await prisma.teacherRequests.update({
    where: {
      id: id,
    },
    data: {
      status: 'approved',
    },
  })

  await prisma.user.update({
    where: {
      id: updatedRequest.userId,
    },
    data: {
      role: 'TEACHER',
    },
  });

  return NextResponse.json({ message: "Role succesfully updated" });
}
