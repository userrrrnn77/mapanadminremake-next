import api from "@/services/_axios";
import { RegisterBody, UpdateMeBody } from "./types";

export const regiterReq = async (data: RegisterBody) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const loginReq = async (data: { phone: string; password: string }) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const logoutReq = async () => {
  try {
    const response = await api.delete("/auth/logout");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateMeReq = async (data: UpdateMeBody) => {
  const response = await api.patch("/auth/me", data);
  return response.data;
};
