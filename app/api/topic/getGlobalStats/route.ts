import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    let result = await prisma.$queryRaw`
      SELECT
        ST."testId",
        COUNT(ST."testId") AS users_completed
      FROM public."SolvedTest" ST
      WHERE ST.score = 100
      GROUP BY ST."testId"
      ORDER BY ST."testId";
    ` as {
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
    return NextResponse.json({ 
      test: `hello ${error}`,
    }, { status: 500 });
  }
}
