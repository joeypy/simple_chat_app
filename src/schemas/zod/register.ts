import { z } from "zod";

export const registerFormSchema = z.object({
  name: z
    .string({ required_error: "El nombre es requerido." })
    .min(1, "El nombre es requerido.")
    .max(100, "El nombre debe tener menos de 100 caracteres."),
  email: z
    .string({ required_error: "El email es requerido." })
    .min(1, "Email is required")
    .email({ message: "Correo electrónico inválido." }),
  password: z
    .string({ required_error: "La contraseña es requerida." })
    .min(4, { message: "La contraseña debe ser más de 4 caracteres." })
    .max(32, {
      message: "La contraseña debe ser menos de 32 caracteres.",
    }),
});

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
