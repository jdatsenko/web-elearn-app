import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const topicId = req.nextUrl.searchParams.get("id");

    if (topicId) {
        const topic = await prisma.content.findUnique({
            where: {
                topicNumber: parseInt(topicId),
            },
        });

        const response = NextResponse.json({ data: topic });
        response.headers.set("Cache-Control", "no-store");
        return response;
    }

    const response = NextResponse.json({ message: "Hello from the API" });
    response.headers.set("Cache-Control", "no-store");
    return response;
}
