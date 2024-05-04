import prisma from "@/lib/prisma";
import { Prisma, Test } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { number } from "zod";

export interface TestRequest {
  topicId: number
  questions: Question[]
}

export interface Question {
  label: string
  answers: Answer[]
}

export interface Answer {
  label: string
  isRight: boolean
  number: number
}


export async function POST(req: Request) {
  console.log("POST /api/test");
  try {
    const body = await req.json() as TestRequest;
    console.log(body);

    // return;
    const test = await prisma.test.create({
      data: {
        topicId: body.topicId,
        questions: {
          create: body.questions.map((question) => ({
            text: question.label,
            answers: {
              create: question.answers.map((answer) => ({
                text: answer.label,
                isCorrect: answer.isRight,
                answerNumber: answer.number,
              }))
            }
          }))
        }
      }
    })

    return NextResponse.json({ data: test });
  } catch (error) {
    console.error("Error creating test:", error);
    return NextResponse.json({ error: "Error creating test" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  console.log("GET /api/test");
  const topicId = req.nextUrl.searchParams.get("id");

  if (topicId) {
    const test = await prisma.test.findMany({
      include: {
        questions: {
          include: {
            answers: true
          }
        },
      },
      where: {
        topicId: parseInt(topicId),
      }
    });

    return NextResponse.json(test[0]);
  }

  return NextResponse.json({ message: "GET /api/test" });
}
