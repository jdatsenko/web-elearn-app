import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Nie ste prihlásený" }, { status: 401 });
  }
  const request = await prisma.teacherRequests.findFirst({
    where: { userId: session.user.id },
    select: {
      status: true,
    },
  });

  if (!request) {
    return NextResponse.json({ message: "Žiadosť neexistuje" }, { status: 404 });
  }
  return NextResponse.json(request);
}
