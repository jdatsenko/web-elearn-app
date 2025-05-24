import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Musíte sa prihlásiť." }, { status: 401 });
    }
    
    if (session.user.role !== "TEACHER" && session.user.role !== "ADMIN")
      return NextResponse.json(
        { message: "You are not authorized to update topic" },
        { status: 403 }
      );
  try {
    const body = await req.json();
    const { topicNumber, title, description, content } = body;

    if (!topicNumber || !title || !description || !content) {
      return NextResponse.json(
        { message: "Všetky polia sú povinné." },
        { status: 400 }
      );
    }
    const existingTopic = await prisma.topic.findUnique({ where: { topicNumber: parseInt(topicNumber) } });

    if (!existingTopic) {
      return NextResponse.json(
        { message: "Téma neexistuje." },
        { status: 404 }
      );
    }

    const updatedTopic = await prisma.topic.update({
      where: { topicNumber: parseInt(topicNumber) },
      data: {
        title,
        description,
        content,
      },
    });

    return NextResponse.json(
      { message: "Téma bola úspešne upravená.", topic: updatedTopic },
      { status: 200 }
    );
  } catch (error) {
    console.error("Chyba pri aktualizácii témy:", error);
    return NextResponse.json(
      { message: "Chyba pri aktualizácii témy." + error },
      { status: 500 }
    );
  }
}
