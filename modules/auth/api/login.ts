import { api } from "@/lib/api";
import { LoginPayload, User } from "../types/login-payload-type";

export const login = async (data: LoginPayload): Promise<User> => {
  const res = await api.post("/auth/session/login", data);
  return res.data;
};
