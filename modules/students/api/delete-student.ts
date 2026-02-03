import { api } from "@/lib/api";
import { IResponseProps } from "@/types/response";

export const deleteStudent = async (id: string): Promise<void> => {
  await api.delete<IResponseProps<null>>(`/students/${id}`);
};
