import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const topics = await prisma.content.findMany({
      select: {
        topicNumber: true,
        title: true,
        description: true,
      },
    });
    return NextResponse.json({ data: topics });
  } catch (error) {
    if (error instanceof Error) {
      // Narrow the type to Error
      console.error("Error fetching topics:", error.message);
      console.error("Stack trace:", error.stack);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      // Handle other unknown types (unlikely in this context)
      console.error("Unknown error:", error);
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
