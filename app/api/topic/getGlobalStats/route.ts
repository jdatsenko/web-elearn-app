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
    const completedTests = await prisma.solvedTest.groupBy({
      by: ['testId'],
      where: {
        score: 100,
      },
      _count: {
        testId: true,
      },
      orderBy: {
        testId: 'asc',
      },
    });

    const enrichedResult = await Promise.all(
      completedTests.map(async (group) => {
        const test = await prisma.test.findUnique({
          where: {
            id: group.testId,
          },
          select: {
            topic: {
              select: {
                topicNumber: true,
              },
            },
          },
        });

        return {
          testId: group.testId,
          topicNumber: test?.topic?.topicNumber ?? null,
          users_completed: group._count.testId,
        };
      })
    );

return NextResponse.json({ data: enrichedResult });

  } catch (error) {
    console.error("Error fetching topic:", error);
    return NextResponse.json({ 
      test: `hello ${error}`,
    }, { status: 500 });
  }
}
