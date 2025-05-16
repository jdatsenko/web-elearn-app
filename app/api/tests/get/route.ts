import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Musíte sa prihlásiť." }, { status: 401 });

  try {
    const topicNumber = req.nextUrl.searchParams.get("id");
    if (topicNumber) {
      const test = await prisma.test.findMany({
        include: {
          topic: {
            select: {
              topicNumber: true,
              title: true,
            },
          },
          questions: {
            include: {
              answers: true,
            },
          },
        },
        where: {
          topicNumber: parseInt(topicNumber),
        },
      });
      return NextResponse.json(test[0]);
    }
  } catch (error) {
    console.error("Error fetching test:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
