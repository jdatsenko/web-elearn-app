import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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
              answers: true
            }
          },
        },
        where: {
          topicNumber: parseInt(topicNumber),
        }
      });
  
      return NextResponse.json(test[0]);
    }
  
    return NextResponse.json({ message: "GET /api/test" });
  }
  