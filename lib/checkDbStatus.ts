import prisma from "./prisma";

export async function checkDbStatus() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { ok: true };
  } catch (err: any) {

    const message = String(err.message || err);

    const isPaused =
      message.includes("ECONNRESET") ||
      message.includes("ETIMEDOUT") ||
      message.includes("PrismaClientInitializationError") ||
      message.includes("Connection") ||
      message.includes("unavailable");

    return {
      ok: false,
      paused: isPaused,
      error: message,
    };
  }
}
