import { z } from "zod";

export const StudentSchema = z.object({
  classId: z.number().min(1, "Class is required."),
  parentId: z.number().min(1, "Parent is required."),
  fullName: z.string().min(1, "Fullname is required."),
  studentNumber: z.string().min(1, "Student number is required."),
});

export type StudentForm = z.infer<typeof StudentSchema>;
