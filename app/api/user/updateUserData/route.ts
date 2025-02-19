import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Nie ste prihlásený." }, { status: 401 });
    }

    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { message: "Meno a email sú povinné." },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { name, email },
    });

    return NextResponse.json(
      { message: "Údaje úspešne aktualizované.", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Chyba pri aktualizácii údajov.", error: error },
      { status: 500 }
    );
  }
}
