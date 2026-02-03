import { api } from "@/lib/api";
import { IResponseProps } from "@/types/response";

export const deleteClass = async (id: string): Promise<void> => {
  await api.delete<IResponseProps<null>>(`/classes/${id}`);
};
