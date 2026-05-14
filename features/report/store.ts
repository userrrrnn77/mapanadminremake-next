// features/report/store.ts

// features/report/store.ts
import { create } from "zustand";
import { IReport } from "./types";

interface ReportState {
  reports: IReport[];
  isLoading: boolean;
  setReports: (data: IReport[]) => void;
  setLoading: (val: boolean) => void;
  updateReportStatusInStore: (
    reportId: string,
    status: IReport["status"],
  ) => void;
}

export const useReportStore = create<ReportState>((set) => ({
  reports: [],
  isLoading: false,
  setReports: (data) => set({ reports: data }),
  setLoading: (val) => set({ isLoading: val }),
  updateReportStatusInStore: (reportId, status) =>
    set((state) => ({
      reports: state.reports.map((r) =>
        r._id === reportId ? { ...r, status } : r,
      ),
    })),
}));
