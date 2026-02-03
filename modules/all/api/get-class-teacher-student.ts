import { api } from "@/lib/api";
import { ClassTeacherStudentType } from "../types/class-teacher-student-type";

export const getAllClassTeacherStudent = async (): Promise<
  ClassTeacherStudentType[]
> => {
  const result = await api.get("/classes/teachers-students");
  return result.data.data.class;
};
