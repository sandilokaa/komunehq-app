import { z } from "zod";

export const ParentSchema = z.object({
  fullName: z.string().min(1, "Fullname is required."),
  occupation: z.string().min(1, "Occupation is required."),
});

export type ParentForm = z.infer<typeof ParentSchema>;
