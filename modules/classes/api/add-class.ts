import { api } from "@/lib/api";
import { ClassType } from "../types/class-type";
import { ClassForm } from "../schemas/add-class-schemas";
import { IResponseProps } from "@/types/response";

export const addClass = async (payload: ClassForm): Promise<ClassType> => {
  const res = await api.post<IResponseProps<{ class: ClassType }>>(
    "/classes",
    payload,
  );

  return res.data.data.class;
};
