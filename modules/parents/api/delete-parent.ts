import { api } from "@/lib/api";
import { IResponseProps } from "@/types/response";

export const deleteParent = async (id: string): Promise<void> => {
  await api.delete<IResponseProps<null>>(`/parents/${id}`);
};
