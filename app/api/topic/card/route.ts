import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;
export async function GET(req: NextRequest) {
  try {
    const topics = await prisma.topic.findMany({
      select: {
        topicNumber: true,
        title: true,
        description: true,
      },
    });

    const response = NextResponse.json({ data: topics });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("Unknown error:", error);
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
