import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const name = body.name as string;
  const surname = body.surname as string;
  const qualification = body.qualification as string;
  const experience = body.experience as string;

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Not logged in" }, { status: 401 });
  }

  const userId = session.user.id;
  const email = session.user.email;

  const teacherRequestExists = await prisma.teacherRequests.findFirst({
    where: {
      userId: userId,
    },
  });

  if (teacherRequestExists && teacherRequestExists.status == 'pending') {
    return NextResponse.json(
      { message: "Teacher request already exists" },
      { status: 400 }
    );
  }

  await prisma.teacherRequests.create({
    data: {
      name: name,
      surname: surname,
      qualification: qualification,
      experience: experience,
      userId: userId,
      email: email,
    },
  });

  return NextResponse.json({ message: "Password updated successfully" });
}
