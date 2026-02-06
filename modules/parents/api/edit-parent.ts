import { api } from "@/lib/api";
import { IResponseProps } from "@/types/response";
import { ParentForm } from "../schemas/parent-schema";
import { ParentType } from "../types/parent-type";

export const updateParent = async (
  id: string,
  payload: ParentForm,
): Promise<ParentType> => {
  const res = await api.put<IResponseProps<{ parent: ParentType }>>(
    `/parents/${id}`,
    payload,
  );

  return res.data.data.parent;
};
