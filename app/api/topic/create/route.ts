import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface TopicRequest {
    title: string;
    description: string;
    content: string[];
}

export async function POST(req: Request) {
    try {
        const body = await req.json() as TopicRequest;

        const latestTopic = await prisma.topic.findFirst({
            orderBy: {
                topicNumber: 'desc', 
            },
            select: {
                topicNumber: true, 
            },
        });

        const nextTopicNumber = latestTopic ? latestTopic.topicNumber + 1 : 1; 
        const topic = await prisma.topic.create({
            data: {
                id: nextTopicNumber,
                topicNumber: nextTopicNumber,
                title: body.title,
                description: body.description,
                content: body.content,
            },
        });

        return NextResponse.json({ topic });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Chyba pri vytváraní témy" }, { status: 500 });
    }
}
