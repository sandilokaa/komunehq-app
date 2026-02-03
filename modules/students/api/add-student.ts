import { api } from "@/lib/api";
import { IResponseProps } from "@/types/response";
import { StudentForm } from "../schemas/student-schemas";
import { StudentType } from "../types/student-type";

export const addStudent = async (
  payload: StudentForm,
): Promise<StudentType> => {
  const res = await api.post<IResponseProps<{ student: StudentType }>>(
    "/students",
    payload,
  );

  return res.data.data.student;
};
