import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Neautorizovaný prístup" },
        { status: 401 }
      );
    }
    await prisma.user.delete({
        where: { id: session.user.id },
      });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Chyba pri vymazaní používateľa", error },
      { status: 500 }
    );
  }
}
