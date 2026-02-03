import { api } from "@/lib/api";
import { StudentType } from "../types/student-type";

export const getAllStudent = async (): Promise<StudentType[]> => {
  const result = await api.get("/students");
  return result.data.data.student;
};
