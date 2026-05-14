"use client";

import { useEffect } from "react";
import { useActivity } from "@/features/activity/hooks/useActivity";
import { ActivityTable } from "@/features/activity/components/ActivityTable";
import { ActivityFilter } from "@/features/activity/components/ActivityFilter";
import { Card } from "@/components/ui/Card";

export default function ActivitiesPage() {
  const { activities, isLoading, fetchAllActivities } = useActivity();

  /**
   * Mengambil data seluruh aktivitas dari server.
   */
  useEffect(() => {
    fetchAllActivities();
  }, [fetchAllActivities]); // React Hook useEffect has a missing dependency: 'fetchAllActivities'. Either include it or remove the dependency array.

  /**
   * Menghitung statistik aktivitas berdasarkan shift dari data User.
   * Karena shift ada di level User (a.user.shift), kita akses ke sana.
   */
  const stats = {
    total: activities.length,
    pagi: activities.filter((a) => a.user?.shift === "pagi").length,
    siang: activities.filter((a) => a.user?.shift === "siang").length,
    malam: activities.filter((a) => a.user?.shift === "malam").length,
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Bagian Judul Halaman */}
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Monitoring Aktivitas Lapangan
        </h1>
        <p className="text-sm text-zinc-500 font-medium">
          Daftar dokumentasi dan laporan pengerjaan tugas dari seluruh unit
          kerja.
        </p>
      </header>

      {/* Baris Statistik Ringkas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-blue-600 shadow-sm bg-white dark:bg-zinc-900">
          <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
            Total Kegiatan
          </p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-green-500 shadow-sm bg-white dark:bg-zinc-900">
          <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
            Unit Pagi
          </p>
          <p className="text-2xl font-bold">{stats.pagi}</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-yellow-500 shadow-sm bg-white dark:bg-zinc-900">
          <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
            Unit Siang
          </p>
          <p className="text-2xl font-bold">{stats.siang}</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-zinc-800 shadow-sm bg-white dark:bg-zinc-900">
          <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
            Unit Malam
          </p>
          <p className="text-2xl font-bold">{stats.malam}</p>
        </Card>
      </div>

      {/* Bagian Filter Pencarian */}
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <ActivityFilter />
      </div>

      {/* Tabel Utama Daftar Aktivitas */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
        <ActivityTable data={activities} isLoading={isLoading} />
      </div>
    </div>
  );
}
