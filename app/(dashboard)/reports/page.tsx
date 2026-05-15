"use client";

import { useEffect } from "react";
import { useReport } from "@/features/report/hooks/useReport";
import { ReportTable } from "@/features/report/components/ReportTable";
import { ReportStats } from "@/features/report/components/ReportStats";

export default function ReportsPage() {
  const { reports, isLoading, fetchAllReports } = useReport();

  useEffect(() => {
    fetchAllReports();
  }, [fetchAllReports]);

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header Halaman Laporan */}
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Pusat Laporan Pengaduan
        </h1>
        <p className="text-sm text-zinc-500 font-medium">
          Pantau dan tindak lanjuti laporan kejadian atau kerusakan dari unit
          kerja lapangan.
        </p>
      </header>

      {/* Komponen Statistik Laporan (Open, In Progress, Resolved, Rejected) */}
      <ReportStats data={reports} />

      {/* Bagian Utama: Tabel Laporan dengan Fungsi Export PDF */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
        <div className="p-1">
          <ReportTable data={reports} isLoading={isLoading} />
        </div>
      </div>

      {/* Info Tambahan Footer Halaman */}
      <footer className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest text-center py-4">
        Sistem Pelaporan Terpusat Mapan Rajasa &copy; 2026
      </footer>
    </div>
  );
}
