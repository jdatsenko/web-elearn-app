import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const id = body.id;

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Nie ste prihlásení" }, { status: 401 });
  }

  if (session.user.role !== 'ADMIN') {
    return NextResponse.json({ message: "Nemáte oprávnenie" }, { status: 401 });
  }

  await prisma.teacherRequests.update({
    where: {
      id: id,
    },
    data: {
      status: "rejected",
    },
  });

  return NextResponse.json({ message: "Žiadosť zamietnutá" });
}
