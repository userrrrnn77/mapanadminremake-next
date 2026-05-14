import api from "@/services/_axios";
import { IWorkLocationFE } from "./types";

/**
 * 🔥 API CALLS
 */

export const getAllLocationsReq = async (): Promise<{
  success: boolean;
  data: IWorkLocationFE[];
}> => {
  const response = await api.get("/worklocation");
  return response.data;
};

export const createLocationReq = async (data: IWorkLocationFE) => {
  const response = await api.post("/worklocation", data);
  return response.data;
};

export const updateLocationReq = async (id: string, data: IWorkLocationFE) => {
  const response = await api.patch(`/worklocation/${id}`, data);
  return response.data;
};

export const deleteLocationReq = async (id: string) => {
  const response = await api.delete(`/worklocation/${id}`);
  return response.data;
};
