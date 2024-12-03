"use server";

import { createSession } from "@/lib/session";
import { createUser, getUserByEmail } from "@/services/users";
import { TRegisterUser } from "@/types/user";
import bcrypt from "bcryptjs";

export const register = async (values: TRegisterUser) => {
  try {
    const { email, password } = values;

    // Verifica si el usuario ya existe
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { error: "El correo ya está registrado" };
    }

    // Encripta la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserta al usuario en la base de datos
    const user = await createUser({ ...values, password: hashedPassword });

    if (user) {
      const tokenSession = crypto.randomUUID();
      await createSession({
        userId: user.id,
        tokenSession,
      });
    } else {
      return {
        error: "User could not be created.",
      };
    }
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Error 500: No se pudo registrar el usuario" };
  }
};
