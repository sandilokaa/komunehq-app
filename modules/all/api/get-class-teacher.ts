import { api } from "@/lib/api";
import { ClassTeacherType } from "../types/class-teacher-type";

export const getAllClassTeacher = async (): Promise<ClassTeacherType[]> => {
  const result = await api.get("/classes/teachers");
  return result.data.data.class;
};
