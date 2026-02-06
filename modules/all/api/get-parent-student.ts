import { api } from "@/lib/api";
import { ParentStudentType } from "../types/parent-student-type";

export const getAllParentStudent = async (): Promise<ParentStudentType[]> => {
  const result = await api.get("/parents/students");
  return result.data.data.parent;
};
