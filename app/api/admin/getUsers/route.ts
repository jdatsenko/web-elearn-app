import { UserRole } from "@prisma/client"; 
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { message: "Musíte sa prihlásiť." },
      { status: 401 }
    );
  if (session.user.role !== "ADMIN")
    return NextResponse.json(
      { message: "Not authorized as admin" },
      { status: 401 }
    );

  const url = new URL(req.url);
  const roleParam = url.searchParams.get("role") ?? "all";

  let roleFilter: { role: UserRole } | undefined = undefined;

  if (roleParam !== "all") {
    if (
      roleParam === UserRole.ADMIN ||
      roleParam === UserRole.TEACHER ||
      roleParam === UserRole.USER
    ) {
      roleFilter = { role: roleParam as UserRole };
    } else {
      return NextResponse.json(
        { message: "Invalid role filter" },
        { status: 400 }
      );
    }
  }

  const users = await prisma.user.findMany({
    where: roleFilter,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      role: true,
      _count: {
        select: {
          createdTopics: true,
          solvedTests: true,
        },
      },
    },
  });

  const count = await prisma.user.count({
    where: roleFilter,
  });

  if (users.length === 0) {
    return NextResponse.json({ message: "No users found" }, { status: 404 });
  }
  return NextResponse.json({ users, count }, { status: 200 });
}
