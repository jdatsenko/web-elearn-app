import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";

const FILE_PATH = path.resolve(process.cwd(), "videos.txt");

export async function GET() {
  try {
    const content = await fs.readFile(FILE_PATH, "utf-8");
    const urls = content
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    return NextResponse.json(urls);
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const body = await req.json();
  const { url } = body;

  if (
    !session ||
    (session.user.role !== "TEACHER" && session.user.role !== "ADMIN")
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (
    typeof url !== "string" ||
    (!url.includes("youtube.com") && !url.includes("youtu.be"))
  ) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    await fs.appendFile(FILE_PATH, url + "\n");
    return NextResponse.json({ message: "Video saved" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to write" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const body = await req.json();
  const { url } = body;

  if (
    !session ||
    (session.user.role !== "TEACHER" && session.user.role !== "ADMIN")
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (typeof url !== "string") {
    return NextResponse.json({ error: "Missing URL" }, { status: 400 });
  }

  try {
    const content = await fs.readFile(FILE_PATH, "utf-8");
    const urls = content
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .filter((line) => line !== url);

    await fs.writeFile(FILE_PATH, urls.join("\n") + "\n");
    return NextResponse.json({ message: "Video deleted" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}