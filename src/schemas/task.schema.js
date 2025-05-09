import { z } from "zod";

export const taskSchema = z.object({
  title: z.string({
    required_error: "Titulo requerido",
  }),
  description: z.string({
    required_error: "Descripción requerida.",
  }),
  status: z
    .enum(["0", "1", "2", "3"])
    .transform(Number)
    .optional()
    .default("0"),
  priority: z.enum(["0", "1", "2"]).transform(Number).optional().default("0"),
  date: z.string().datetime().optional(),
});
