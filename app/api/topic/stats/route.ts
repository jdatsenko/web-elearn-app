import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "Musíte sa prihlásiť." },
      { status: 401 }
    );
  }

  if (session.user.role !== "TEACHER" && session.user.role !== "ADMIN") {
    return NextResponse.json(
      { message: "You are not authorized to get statistics of topic" },
      { status: 403 }
    );
  }

  try {
    const topicNumber = Number(req.nextUrl.searchParams.get("id"));
    if (isNaN(topicNumber)) {
      return NextResponse.json({ message: "Invalid topic number" }, { status: 400 });
    }

    const result = (await prisma.$queryRaw`
      SELECT
        ST."testId",
        DATE_TRUNC('day', ST."solvedAt") AS day,
        COUNT(ST."testId") AS users_completed
      FROM public."SolvedTest" ST
      JOIN public."Test" T ON ST."testId" = T.id
      WHERE ST.score = 100 AND T."topicNumber" = ${topicNumber}
      GROUP BY ST."testId", day
      ORDER BY ST."testId", day;
    `) as {
      testId: number;
      day: Date;
      users_completed: number;
    }[];

    const serializedResult = result.map((row) => ({
      ...row,
      users_completed: Number(row.users_completed),
    }));

    return NextResponse.json({ data: serializedResult });
  } catch (error) {
    console.error("Error fetching topic stats:", error);
    return NextResponse.json(
      { message: "Internal server error", error: String(error) },
      { status: 500 }
    );
  }
}
