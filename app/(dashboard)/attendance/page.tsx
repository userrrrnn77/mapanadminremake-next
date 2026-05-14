"use client";

import { useEffect } from "react";
import { useAttendance } from "@/features/attendance/hooks/useAttendance";
import { AttendanceTable } from "@/features/attendance/components/AttendanceTable";
import { AttendanceStats } from "@/features/attendance/components/AttendanceStats";

export default function AttendancePage() {
  // Ambil fungsi dan data yang sudah disinkronkan dari hook
  const { attendance, isLoading, fetchAllAttendances, stats } = useAttendance();

  useEffect(() => {
    // Menjalankan fetch data saat komponen pertama kali dimuat
    fetchAllAttendances();
  }, [fetchAllAttendances]);

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Manajemen Presensi
        </h1>
        <p className="text-sm text-zinc-500">
          Monitor detail kehadiran, keterlambatan, dan denda karyawan secara
          real-time.
        </p>
      </header>

      {/* Ringkasan Statistik Kehadiran */}
      <AttendanceStats stats={stats} />

      {/* Tabel Utama Daftar Absensi */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <AttendanceTable data={attendance} isLoading={isLoading} />
      </div>
    </div>
  );
}
