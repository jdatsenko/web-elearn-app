import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const revalidate = 0;

export async function DELETE(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ message: "Musíte sa prihlásiť." }, { status: 401 });
        
        const user = await prisma.user.findUnique({ where: { id: session.user.id }});
        const { topicNumber } = await req.json();

        if(user?.role !== "ADMIN") {
            if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

            if (!topicNumber) return NextResponse.json({ error: "Topic number is required" }, { status: 400 });
            
            const topicExists = await prisma.topic.findUnique({
                where: {
                    topicNumber: parseInt(topicNumber),
                    createdById: user.id,
                },
            });
            if (!topicExists) return NextResponse.json({ error: "Topic not found or not created by user" }, { status: 404 });
        }
       
        const topic = await prisma.topic.delete({
            where: {
                topicNumber: parseInt(topicNumber), 
            },
        });
        if (!topic) return NextResponse.json({ error: "Topic not found" }, { status: 404 });
        return NextResponse.json({ message: "Topic deleted successfully" });
    } catch (error) {
        console.error("Error deleting topic:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
