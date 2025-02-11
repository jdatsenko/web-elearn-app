import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const revalidate = 0;
export async function GET(req: NextRequest) {
    const topicId = req.nextUrl.searchParams.get("id");

    if (topicId) {
        const topic = await prisma.content.findUnique({
            where: {
                topicNumber: parseInt(topicId),
            },
        });

        const response = NextResponse.json({ data: topic });
        return response;
    }

    const response = NextResponse.json({ message: "Hello from the API" });
    return response;
}
