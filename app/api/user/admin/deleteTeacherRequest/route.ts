import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const body = await req.json();
  const id = body.id;

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Musíte sa prihlásiť." }, { status: 401 });
  }

  if (session.user.role !== 'ADMIN') {
    return NextResponse.json({ message: "Not authorized as admin" }, { status: 401 });
  }

 const deletedRequest = await prisma.teacherRequests.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json({ message: "Teacher request deleted successfully", deletedRequest }, { status: 200 });
}
