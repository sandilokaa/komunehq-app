import { z } from "zod";

export const ClassSchema = z.object({
  className: z.string().min(1, "Classname is required."),
  gradeLevel: z.number().min(1, "Grade level is required."),
});

export type ClassForm = z.infer<typeof ClassSchema>;
