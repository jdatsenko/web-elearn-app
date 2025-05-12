import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { topicNumber, title, description, content } = body;

    if (!topicNumber || !title || !description || !content) {
      return NextResponse.json(
        { message: "Všetky polia sú povinné." },
        { status: 400 }
      );
    }
    const existingTopic = await prisma.topic.findUnique({ where: { id: parseInt(topicNumber) } });

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
