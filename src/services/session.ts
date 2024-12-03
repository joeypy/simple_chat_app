"use server";

import { db } from "@/db";
import { sessionsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const createSession = async ({ userId }: { userId: string }) => {
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 días de expiración
  try {
    const tokenSession = crypto.randomUUID();

    const session = await db
      .insert(sessionsTable)
      .values({
        userId,
        tokenSession,
        expiresAt,
      })
      .returning({
        id: sessionsTable.id,
        tokenSession: sessionsTable.tokenSession,
      });

    return session[0];
  } catch (error) {
    console.error("Error al crear sesión:", error);
    throw new Error("No se pudo crear la sesión");
  }
};

export const deleteSession = async (tokenSession: string) => {
  try {
    await db
      .delete(sessionsTable)
      .where(eq(sessionsTable.tokenSession, tokenSession));
  } catch (error) {
    console.error("Error al eliminar sesión:", error);
    throw new Error("No se pudo eliminar la sesión");
  }
};
