import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Musíte sa prihlásiť.hlásiť." }, { status: 401 });
  }
  
  if (session.user.role !== "TEACHER")
    return NextResponse.json(
      { message: "You are not authorized to get statistics of topic" },
      { status: 403 }
    );

  try {
    let topicNumber = Number(req.nextUrl.searchParams.get("id"));
    let result = (await prisma.$queryRaw`
      SELECT
        ST."testId",
        DATE_TRUNC('day', ST."solvedAt") AS day,
        COUNT(ST."testId") AS users_completed
      FROM public."SolvedTest" ST
      WHERE ST.score = 100 AND ST."testId" = ${topicNumber}
      GROUP BY ST."testId", day
      ORDER BY ST."testId", day;
    `) as {
      topicNumber: number;
      day: Date;
      users_completed: number;
    }[];

    const serializedResult = result.map((row: any) => ({
      ...row,
      users_completed: Number(row.users_completed),
    }));

    return NextResponse.json({ data: serializedResult });
  } catch (error) {
    console.error("Error fetching topic:", error);
    return NextResponse.json(
      {
        test: `hello ${error}`,
      },
      { status: 500 }
    );
  }
}
