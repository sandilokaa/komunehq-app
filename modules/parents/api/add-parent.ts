import { api } from "@/lib/api";
import { IResponseProps } from "@/types/response";
import { ParentForm } from "../schemas/parent-schema";
import { ParentType } from "../types/parent-type";

export const addParent = async (payload: ParentForm): Promise<ParentType> => {
  const res = await api.post<IResponseProps<{ parent: ParentType }>>(
    "/parents",
    payload,
  );

  return res.data.data.parent;
};
