import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { userId, newRole } = await req.json();

  if (userId == session.user.id) {
    return NextResponse.json(
      { message: "Cannot change your own role" },
      { status: 400 }
    );
  }

  if (!userId || !newRole) {
    return NextResponse.json({ message: "Invalid input" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: userId },
    data: { role: newRole },
  });

  return NextResponse.json({ message: "Role updated successfully" });
}
