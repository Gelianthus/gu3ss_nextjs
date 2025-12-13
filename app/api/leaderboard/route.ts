import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, score, timeTaken, quizId } = body;

    if (!username || score == null || timeTaken == null || !quizId) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const recentEntry = await prisma.leaderboard.findFirst({
      where: {
        username,
        score,
        timeTaken,
        quizId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (recentEntry) {

      const timeSince = Date.now() - new Date(recentEntry.createdAt).getTime();
      if (timeSince < 4000) {
        return NextResponse.json(
          { error: "Duplicate submission detected." },
          { status: 429 }
        );
      }
    }

    const entry = await prisma.leaderboard.create({
      data: {
        username,
        score,
        timeTaken,
        quizId,
      },
      include: {
        quiz: true,
      },
    });

    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    console.error("Leaderboard POST error:", error);
    return NextResponse.json(
      { error: "Failed to create leaderboard entry." },
      { status: 500 }
    );
  }
}
