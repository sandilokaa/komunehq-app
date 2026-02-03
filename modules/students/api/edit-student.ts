import { api } from "@/lib/api";
import { IResponseProps } from "@/types/response";
import { StudentForm } from "../schemas/student-schemas";
import { StudentType } from "../types/student-type";

export const updateStudent = async (
  id: string,
  payload: StudentForm,
): Promise<StudentType> => {
  const res = await api.put<IResponseProps<{ student: StudentType }>>(
    `/students/${id}`,
    payload,
  );

  return res.data.data.student;
};
