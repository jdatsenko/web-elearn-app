import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const revalidate = 0;

export async function GET(req: NextRequest) {
    try {
        const topics = await prisma.topic.findMany({
            select: {
                title: true,
                topicNumber: true,
            },
            orderBy: {
                topicNumber: 'asc', 
            },
        });

        const topicTitles = topics.map(topic => topic.title);

        return NextResponse.json({ data: topicTitles });

    } catch (error) {
        console.error("Error fetching topics:", error);
        return NextResponse.json({ error: "Error fetching topics" }, { status: 500 });
    }
}
