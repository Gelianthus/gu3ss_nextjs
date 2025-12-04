import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: { quizId: string } }) {
  try {

    const { quizId } = await context.params;

    const data = await prisma.leaderboard.findMany({
      where: { quizId },
      orderBy: [
        { score: "desc" },
        { timeTaken: "asc" },
      ],
      take: 10,
    });

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json([], { status: 500 });
  }
}
