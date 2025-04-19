import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const revalidate = 0;

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({ error: "Topic ID is required" }, { status: 400 });
        }
        const topic = await prisma.topic.delete({
            where: {
                id: parseInt(id), 
            },
        });

        if (!topic) {
            return NextResponse.json({ error: "Topic not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Topic deleted successfully" });
    } catch (error) {
        console.error("Error deleting topic:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
