import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { userId } = await req.json();
  if (userId === session.user.id) {
    return NextResponse.json(
      { message: "Cannot delete your own account" },
      { status: 400 }
    );
  }

  if (!userId) {
    return NextResponse.json({ message: "User ID required" }, { status: 400 });
  }

  await prisma.user.delete({ where: { id: userId } });

  return NextResponse.json({ message: "User deleted successfully" });
}
