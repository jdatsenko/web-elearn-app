import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export interface Answers {
  answers: Answer[];
}

export interface Answer {
  questionId: number;
  answerId: number;
}

export async function POST(req: Request) {
  const body = (await req.json());
  const answers = body.answers as Answer[];
  const topicNumber = body.topicNumber as number;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Musíte sa prihlásiť." }, { status: 401 });
  }
  const userId = session.user.id;
  const test = await prisma.test.findFirst({
    where: {
      topicNumber: topicNumber,
    },
  });

  if(!test) 
    return NextResponse.json({ message: "Test not found" }, { status: 404 });

  const testId = test?.id;

  const testResults = await Promise.all(
    answers.map(async (answer) => {
      const answerDB = await prisma.answer.findUnique({
        where: {
          id: answer.answerId,
        },
      });

      const result = {
        id: answer.questionId,
        correct: answerDB ? answerDB.isCorrect : false,
      };

      return result;
    })
  );


  const score =
    (testResults.filter((result) => result.correct).length /
      testResults.length) *
      100

      if (score == 100) {
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            topicsCompleted: {
              set: testId,
            },
          }
        });
      }

  const response = {
    results: testResults,
    score: score + "%",
  };

  await prisma.solvedTest.create({
    data: {
      userId: userId,
      testId: testId,
      score: score,
    },
  })


  return NextResponse.json(response);
}
