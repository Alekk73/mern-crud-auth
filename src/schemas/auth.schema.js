import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "El nombre de usuario es requerido.",
  }),
  email: z
    .string({
      required_error: "El email es requerido.",
    })
    .email({
      message: "Email no valido.",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerida.",
    })
    .min(5, {
      message: "La contraseña debe contener al menos 6 caracteres.",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "El email es requerido.",
    })
    .email({
      message: "Email no valido.",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerida.",
    })
    .min(5, { message: "La contraseña debe contener al menos 6 caracteres." }),
});
