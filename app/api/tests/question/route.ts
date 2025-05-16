import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Musíte sa prihlásiť.hlásiť." }, { status: 401 });

  if (session.user.role !== "TEACHER")
    return NextResponse.json(
      { message: "You are not authorized to create test" },
      { status: 403 }
    );
  try {
    const { testInfo, questions } = await req.json();
    if (!testInfo || !questions) {
      return NextResponse.json({
        status: 400,
        body: {
          error: "Test info and questions are required",
        },
      });
    }
    for (const question of questions) {
      if (!question.text || !question.answers) {
        return NextResponse.json({
          status: 400,
          body: {
            error: "Question text and answers are required",
          },
        });
      }
      for (const answer of question.answers) {
        if (!answer.text || answer.isCorrect === undefined) {
          return NextResponse.json({
            status: 400,
            body: {
              error: "Answer text and isCorrect are required",
            },
          });
        }
      }
    }
    const test = await prisma.test.create({
      data: {
        ...testInfo,
        questions: {
          createMany: {
            data: (questions as Prisma.QuestionSelect[]).map((question) => ({
              text: question.text,
              answers: {
                createMany: {
                  data: (question.answers! as Prisma.AnswerSelect[]).map(
                    (answer) => ({
                      text: answer.text,
                      isCorrect: answer.isCorrect,
                    })
                  ),
                },
              },
            })),
          },
        },
      },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });

    return NextResponse.json({
      status: 201,
      body: {
        test,
      },
    });
  } catch (error) {
    console.error("Error creating test1:", error);
    return NextResponse.json({
      status: 500,
      body: {
        error: "Internal Server Error",
      },
    });
  }
}
