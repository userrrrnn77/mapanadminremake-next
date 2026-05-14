import api from "@/services/_axios";
import { CreateActivityBody } from "./types";

export const createActivityReq = async (data: CreateActivityBody) => {
  const response = await api.post("/activity", data);
  return response.data;
};

export const myActivityReq = () => api.get("/activity/me");

export const getAllActivityReq = () => api.get("/activity");
