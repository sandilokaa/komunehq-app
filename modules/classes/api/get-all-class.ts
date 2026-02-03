import { api } from "@/lib/api";
import { ClassType } from "../types/class-type";

export const getAllClass = async (): Promise<ClassType[]> => {
  const result = await api.get("/classes");
  return result.data.data.class;
};
