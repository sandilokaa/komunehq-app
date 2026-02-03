import { api } from "@/lib/api";
import { ClassStudentType } from "../types/class-student-type";

export const getAllClassStudent = async (): Promise<ClassStudentType[]> => {
  const result = await api.get("/classes/students");
  return result.data.data.class;
};
