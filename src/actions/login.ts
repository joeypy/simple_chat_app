"use server";

import bcrypt from "bcryptjs";
import { LoginFormValues } from "@/schemas/zod";

import { createSession } from "@/lib/session";
import { createSession as createDbSession } from "@/services/session";
import { getUserByEmail } from "@/services/users";

export const login = async (values: LoginFormValues) => {
  try {
    const user = await getUserByEmail(values.email);
    if (user) {
      const passwordMatch = await bcrypt.compare(
        values.password,
        user.password
      );

      if (!passwordMatch) {
        return {
          error: "Credenciales incorrectas",
        };
      }

      const dbSession = await createDbSession({
        userId: user.id,
      });
      await createSession({
        userId: user.id,
        tokenSession: dbSession.tokenSession,
      });

      return { success: true };
    } else {
      return {
        error: "Usuario no encontrado",
      };
    }
  } catch (error) {
    return {
      error: "Error 500",
    };
  }
};
