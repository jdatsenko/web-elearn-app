import { compare, hash } from "bcrypt";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";

export async function POST(req: Request) {
  const body = await req.json();
  const oldPassword = body.oldPassword as string;
  const newPassword = body.newPassword as string;

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Not logged in" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  console.log("user", user);

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const passwordMatch = await bcrypt.compare(oldPassword, user.password!);

  if (!passwordMatch) {
    return NextResponse.json(
      { message: "Current password is incorrect" },
      { status: 400 }
    );
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: session.user.id },
    data: { password: hashedNewPassword },
  });

  return NextResponse.json({ message: "Password updated successfully" });
}
