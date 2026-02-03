import { api } from "@/lib/api";
import { IResponseProps } from "@/types/response";
import { TeacherForm } from "../schemas/teacher-schemas";
import { TeacherType } from "../types/teacher-type";

export const updateTeacher = async (
  id: string,
  payload: TeacherForm,
): Promise<TeacherType> => {
  const res = await api.put<IResponseProps<{ teacher: TeacherType }>>(
    `/teachers/${id}`,
    payload,
  );

  return res.data.data.teacher;
};
