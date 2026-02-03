import { api } from "@/lib/api";
import { IResponseProps } from "@/types/response";
import { StudentType } from "../types/student-type";

export const getStudentById = async (id: string): Promise<StudentType> => {
  const res = await api.get<IResponseProps<{ student: StudentType }>>(
    `/students/${id}`,
  );

  return res.data.data.student;
};
