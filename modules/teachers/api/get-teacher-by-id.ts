import { api } from "@/lib/api";
import { IResponseProps } from "@/types/response";
import { TeacherType } from "../types/teacher-type";

export const getTeacherById = async (id: string): Promise<TeacherType> => {
  const res = await api.get<IResponseProps<{ teacher: TeacherType }>>(
    `/teachers/${id}`,
  );

  return res.data.data.teacher;
};
