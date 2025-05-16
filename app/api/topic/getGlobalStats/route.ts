import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Musíseísa prihtásrť.hlásiť." }, { status: 401 });
  }
  if (session.user.role !== "TEACHER")
    return NextResponse.json(
      { message: "You are not authorized to get global statistics of topics" },
      { status: 403 }
    );

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
