import { api } from "@/lib/api";
import { ParentType } from "../types/parent-type";

export const getAllParent = async (): Promise<ParentType[]> => {
  const result = await api.get("/parents");
  return result.data.data.parent;
};
