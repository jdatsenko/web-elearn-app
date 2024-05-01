import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const topics = await prisma.content.findMany({
      select: {
        topicNumber: true,
        title: true,
        description: true,
      },
    });
    return NextResponse.json({ data: topics });
} catch (error) {
    console.error('Error fetching topics:', error);
    return NextResponse.json({ error: 'Error fetching topics' }, { status: 500 });
  }
}


