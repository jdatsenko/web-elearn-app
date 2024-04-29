import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(req: NextRequest) {
    const topicId = req.nextUrl.searchParams.get("id");

    if (topicId) {
        const topic = await prisma.content.findUnique({
            where: {
                topicNumber: parseInt(topicId)
            }
        });

        return NextResponse.json({ data: topic });
    }
    
    return NextResponse.json({ message: "Hello from the API" });
}