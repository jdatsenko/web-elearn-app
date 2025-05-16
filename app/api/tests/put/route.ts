import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { TestRequest } from ".././types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Musíte sa prihlásiť." }, { status: 401 });

  if (session.user.role !== "TEACHER")
    return NextResponse.json(
      { message: "You are not authorized to update tests" },
      { status: 403 }
    );
  try {
    const body = (await req.json()) as TestRequest;
    if (!body.topicNumber) {
      return NextResponse.json(
        { error: req.nextUrl.searchParams },
        { status: 400 }
      );
    }

    const existingTest = await prisma.test.findFirst({
      where: { topicNumber: body.topicNumber },
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
              })),
            },
          })),
        },
      },
    });
    return NextResponse.json({ message: "Test bol aktualizovaný." });
  } catch (error) {
    console.error("Chyba pri aktualizácii testu:", error);
    return NextResponse.json(
      { error: JSON.stringify(error, Object.getOwnPropertyNames(error), 2) },
      { status: 500 }
    );
  }
}
