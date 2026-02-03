import { api } from "@/lib/api";
import { ClassType } from "../types/class-type";
import { IResponseProps } from "@/types/response";

export const getClassById = async (id: string): Promise<ClassType> => {
  const res = await api.get<IResponseProps<{ class: ClassType }>>(
    `/classes/${id}`,
  );

  return res.data.data.class;
};
