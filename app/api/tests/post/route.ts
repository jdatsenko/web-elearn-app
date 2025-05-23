import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { TestRequest } from ".././types";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Musíte sa prihlásiť." }, { status: 401 });

  if(session.user.role !== "TEACHER" && session.user.role !== "ADMIN")
    return NextResponse.json(
        { message: "You are not authorized to create tests" },
        { status: 403 }
        );

  try {
    const body = (await req.json()) as TestRequest;
    await prisma.test.create({
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
              })),
            },
          })),
        },
      },
    });
    return NextResponse.json({ data: body });
  } catch (error) {
    return NextResponse.json(
      { error: JSON.stringify(error, Object.getOwnPropertyNames(error), 2) },
      { status: 500 }
    );
  }
}
