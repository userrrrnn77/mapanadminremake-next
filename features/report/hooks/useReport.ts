// features/report/hooks/useReport.ts
import { useCallback, useState } from "react";
import { useReportStore } from "../store";
import api from "@/services/_axios";
import { CreateReportBody, ReportStatus } from "../types";
import { AxiosError } from "axios";

export const useReport = () => {
  const {
    reports,
    setReports,
    isLoading: storeLoading,
    setLoading,
    updateReportStatusInStore,
  } = useReportStore();

  const [isActionLoading, setIsActionLoading] = useState(false);

  // 1. Tarik Semua Laporan (Admin View)
  const fetchAllReports = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/report");
      setReports(res.data.data || res.data);
    } catch (err) {
      console.error("Gagal ambil laporan, bgsd!", err);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setReports]);

  // 2. Buat Laporan Baru
  const createReport = async (body: CreateReportBody) => {
    setIsActionLoading(true);
    try {
      const res = await api.post("/report", body);
      await fetchAllReports(); // Refresh data
      return { success: true, data: res.data };
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return {
        success: false,
        error: error.response?.data?.message || "Gagal lapor, taik!",
      };
    } finally {
      setIsActionLoading(false);
    }
  };

  // 3. Update Status Laporan (Resolved/In Progress)
  const updateStatus = async (reportId: string, status: ReportStatus) => {
    setIsActionLoading(true);
    try {
      await api.patch(`/report/${reportId}/status`, { status });
      updateReportStatusInStore(reportId, status); // Update lokal biar sat-set
      return { success: true };
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return {
        success: false,
        error: error.response?.data?.message || "Gagal update status!",
      };
    } finally {
      setIsActionLoading(false);
    }
  };

  return {
    reports,
    isLoading: storeLoading || isActionLoading,
    fetchAllReports,
    createReport,
    updateStatus,
  };
};
