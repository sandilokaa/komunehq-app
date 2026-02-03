import { z } from "zod";

export const TeacherSchema = z.object({
  fullName: z.string().min(1, "Fullname is required."),
  subject: z.string().min(1, "Subject is required."),
  teacherNumber: z.string().min(1, "Teacher number is required."),
  classIds: z
    .array(z.number().min(1))
    .min(1, "At least one class must be selected."),
});

export type TeacherForm = z.infer<typeof TeacherSchema>;
