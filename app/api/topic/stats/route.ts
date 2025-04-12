import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    let topicNumber = Number(req.nextUrl.searchParams.get("id"));
    let result = await prisma.$queryRaw`
      SELECT
        ST."testId",
        DATE_TRUNC('day', ST."solvedAt") AS day,
        COUNT(ST."testId") AS users_completed
      FROM public."SolvedTest" ST
      WHERE ST.score = 100 AND ST."testId" = ${topicNumber}
      GROUP BY ST."testId", day
      ORDER BY ST."testId";
    ` as {
      topicNumber: number;
      day: Date;
      users_completed: number;
    }[];

    const serializedResult = result.map((row: any) => ({
      ...row,
      users_completed: Number(row.users_completed), // or String(row.users_completed) if you're worried about large numbers
    }));

    return NextResponse.json({ data: serializedResult });
  } catch (error) {
    console.error("Error fetching topic:", error);
    return NextResponse.json({ 
      test: `hello ${error}`,
    }, { status: 500 });
  }
}
