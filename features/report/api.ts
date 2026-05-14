import api from "@/services/_axios";
import { GetReportsResponse, IReportFE } from "./types";

/**
 * 🔥 API CALLS
 */

// 1. Kirim Laporan Baru
export const createReportReq = async (data: IReportFE) => {
  const response = await api.post("/reports", data);
  return response.data;
};

// 2. Ambil Semua Laporan (Admin Only)
export const getAllReportsReq = async (
  page = 1,
  limit = 10,
): Promise<GetReportsResponse> => {
  const response = await api.get("/reports", {
    params: { page, limit },
  });
  return response.data;
};
