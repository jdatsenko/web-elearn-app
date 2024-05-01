import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface TopicRequest {
    number: number;
    title: string;
    description: string;
    content: string[];
    }

export async function POST(req: Request) {
    try {
        const body = await req.json() as TopicRequest & { content: string[] };

        const existingTopic = await prisma.content.findUnique({
            where: {
                topicNumber: body.number
            }
        });

        if (existingTopic) {
            return NextResponse.json({ error: "Topic already exists" }, { status: 400 });
        }

        const topic = await prisma.content.create({
            data: {
                topicNumber: body.number,
                title: body.title,
                description: body.description,
                content: body.content
            }
        })

        return NextResponse.json({ topic });

    }
    catch (error) {
      console.error("Error creating topic:", error);
      return NextResponse.json({ error: "Error creating topic" }, { status: 500 });
    }
}
