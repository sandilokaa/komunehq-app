import { api } from "@/lib/api";
import { IResponseProps } from "@/types/response";
import { ParentType } from "../types/parent-type";

export const getParentById = async (id: string): Promise<ParentType> => {
  const res = await api.get<IResponseProps<{ parent: ParentType }>>(
    `/parents/${id}`,
  );

  return res.data.data.parent;
};
