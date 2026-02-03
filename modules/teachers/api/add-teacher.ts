import { api } from "@/lib/api";
import { IResponseProps } from "@/types/response";
import { TeacherForm } from "../schemas/teacher-schemas";
import { TeacherType } from "../types/teacher-type";

export const addTeacher = async (
  payload: TeacherForm,
): Promise<TeacherType> => {
  const res = await api.post<IResponseProps<{ teacher: TeacherType }>>(
    "/teachers",
    payload,
  );

  return res.data.data.teacher;
};
