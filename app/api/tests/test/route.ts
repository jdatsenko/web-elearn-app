import prisma from "@/lib/prisma";
import { Prisma, Test } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { number } from "zod";

export interface TestRequest {
  topicId: number;
  topicNumber: number;
  questions: Question[];
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as TestRequest;
    const test = await prisma.test.create({
      data: {
        topicId: body.topicId,
        topicNumber: body.topicNumber,
        questions: {
          create: body.questions.map((question) => ({
            text: question.label,
            answers: {
              create: question.answers.map((answer) => ({
                text: answer.label,
                isCorrect: answer.isRight,
              }))
            }
          }))
        }
      }
    });
    

    return NextResponse.json({ data: body });
  } catch (error) {
    console.log("Error creating test:", error);
    return NextResponse.json({ error: JSON.stringify(error, Object.getOwnPropertyNames(error), 2) }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const topicId = req.nextUrl.searchParams.get("id");

  if (topicId) {
    const test = await prisma.test.findMany({
      include: {
        topic: {
          select: {
            id: true,
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
        topicId: parseInt(topicId),
      }
    });

    return NextResponse.json(test[0]);
  }

  return NextResponse.json({ message: "GET /api/test" });
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json() as TestRequest;
    let topicId = body.topicId;
    if (!body.topicId) {
      return NextResponse.json({ error: req.nextUrl.searchParams }, { status: 400 });
    }

    const existingTest = await prisma.test.findFirst({
      where: { topicId: body.topicId },
      select: { id: true },
    });

    if (!existingTest) {
      return NextResponse.json({ error: "Test neexistuje." }, { status: 404 });
    }

    await prisma.test.update({
      where: { id: existingTest.id },
      data: {
        questions: {
          deleteMany: {}, 
          create: body.questions.map((question) => ({
            text: question.label,
            answers: {
              create: question.answers.map((answer) => ({
                text: answer.label,
                isCorrect: answer.isRight,
              }))
            }
          }))
        }
      }
    });

    return NextResponse.json({ message: "Test bol aktualizovaný." });
  } catch (error) {
    console.error("Chyba pri aktualizácii testu:", error);
    return NextResponse.json({ error: JSON.stringify(error, Object.getOwnPropertyNames(error), 2) }, { status: 500 });
  }
}
