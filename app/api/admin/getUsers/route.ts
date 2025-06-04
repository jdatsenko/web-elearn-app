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

  const users = await prisma.$queryRaw`
     SELECT
        U.id,
        U.name,
        U.email,
        U."createdAt",
        U.role,
        (
          SELECT COUNT(DISTINCT T."id")
          FROM public."Topic" T
          WHERE T."createdById" = U.id
        ) as topics,
        (
          SELECT COUNT(DISTINCT ST."testId")
          FROM public."SolvedTest" ST
          WHERE ST."userId" = U.id AND ST."score" = 100
        ) AS count
      FROM public."User" U
      ORDER BY u.name
    `;

  (users as any).forEach((user: any) => {
    user.topics = Number(user.topics) || 0;
    user.count = Number(user.count) || 0;
  });

  const count = await prisma.user.count({
    where: roleFilter,
  });

  if ((users as any).length === 0)
    return NextResponse.json({ message: "No users found" }, { status: 404 });
  return NextResponse.json({ users, count }, { status: 200 });
}
