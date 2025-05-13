import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { TestRequest } from ".././types";

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