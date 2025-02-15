import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const revalidate = 0;

export async function GET(req: NextRequest) {
    try {
        const topicId = req.nextUrl.searchParams.get("id");

        if (topicId) {
            const topic = await prisma.topic.findUnique({
                where: {
                    topicNumber: parseInt(topicId),
                },
            });

            if (!topic) {
                return NextResponse.json({ error: "Topic not found" }, { status: 404 });
            }

            return NextResponse.json({ data: topic });
        }

        return NextResponse.json({ message: "Hello from the API" });
    } catch (error) {
        console.error("Error fetching topic:", error);
        return NextResponse.json({ error }, { status: 500 });
    }
}
