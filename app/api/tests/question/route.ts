import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { testInfo, questions } = await req.json();
    if (!testInfo || !questions) {
      return {
        status: 400,
        body: {
          error: "Test info and questions are required"
        }
      };
    }
    for (const question of questions) {
      if (!question.text || !question.answers) {
        return {
          status: 400,
          body: {
            error: "Question text and answers are required"
          }
        };
      }
      for (const answer of question.answers) {
        if (!answer.text || answer.isCorrect === undefined) {
          return {
            status: 400,
            body: {
              error: "Answer text and isCorrect are required"
            }
          };
        }
      }
    }
    // Create the test
    const test = await prisma.test.create({
      data: {
        ...testInfo,
        questions: {
          createMany: {
            data: (questions as Prisma.QuestionSelect[]).map(question => ({
              text: question.text,
              answers: {
                createMany: {
                  data: (question.answers! as Prisma.AnswerSelect[]).map(answer => ({
                    text: answer.text,
                    isCorrect: answer.isCorrect
                  }))
                }
              }
            }))
          }
        }
      },
      include: {
        questions: {
          include: {
            answers: true // Ensure that the created answers are included in the response
          }
        }
      }
    });

    return {
      status: 201,
      body: {
        test
      }
    };
  } catch (error) {
    console.error("Error creating test:", error);
    return {
      status: 500,
      body: {
        error: "Internal Server Error"
      }
    };
  }
}
