import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string({ required_error: "El email es requerido." })
    .min(1, "Email is required")
    .email({ message: "Correo electrónico inválido." }),
  password: z
    .string({ required_error: "La contraseña es requerida." })
    .min(8, { message: "La contraseña debe ser más de 8 caracteres." })
    .max(32, {
      message: "La contraseña debe ser menos de 32 caracteres.",
    }),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
