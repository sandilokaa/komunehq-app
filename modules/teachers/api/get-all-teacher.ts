import { api } from "@/lib/api";
import { TeacherType } from "../types/teacher-type";

export const getAllTeacher = async (): Promise<TeacherType[]> => {
  const result = await api.get("/teachers");
  return result.data.data.teacher;
};
