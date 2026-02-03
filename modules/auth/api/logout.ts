import { api } from "@/lib/api";

export const logout = async (): Promise<void> => {
  return await api.post("/auth/session/logout");
};
