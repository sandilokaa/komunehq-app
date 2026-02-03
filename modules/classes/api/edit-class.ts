import { api } from "@/lib/api";
import { ClassType } from "../types/class-type";
import { ClassForm } from "../schemas/add-class-schemas";
import { IResponseProps } from "@/types/response";

export const updateClass = async (
  id: string,
  payload: ClassForm,
): Promise<ClassType> => {
  const res = await api.put<IResponseProps<{ class: ClassType }>>(
    `/classes/${id}`,
    payload,
  );

  return res.data.data.class;
};
