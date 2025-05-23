import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface TopicRequest {
  title: string;
  description: string;
  content: string[];
  createdBy: number;
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Musíte sa prihlásiť." }, { status: 401 });

  if (session.user.role !== "TEACHER" && session.user.role !== "ADMIN")
    return NextResponse.json(
      { message: "You are not authorized to create topic" },
      { status: 403 }
    );
    
  try {
    const body = (await req.json()) as TopicRequest;

    const latestTopic = await prisma.topic.findFirst({
      orderBy: {
        topicNumber: "desc",
      },
      select: {
        topicNumber: true,
      },
    });

    const nextTopicNumber = latestTopic ? latestTopic.topicNumber + 1 : 1;
    const topic = await prisma.topic.create({
      data: {
        topicNumber: nextTopicNumber,
        title: body.title,
        description: body.description,
        content: body.content,
        createdById: body.createdBy,
      },
    });
    return NextResponse.json({ topic });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Chyba pri vytváraní témy" },
      { status: 500 }
    );
  }
}
