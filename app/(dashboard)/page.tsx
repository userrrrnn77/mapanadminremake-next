"use client";

import { useEffect } from "react";
import { useUser } from "@/features/user/hooks/useUser";
import { Card } from "@/components/ui/Card";
import {
  Users,
  UserCheck,
  AlertCircle,
  Clock,
  Activity as ActivityIcon,
} from "lucide-react";

export default function DashboardPage() {
  const { dashboardData, isLoading, fetchDashboardStats } = useUser();

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  // Fallback data
  const stats = dashboardData || {
    totalUsers: 0,
    presentToday: 0,
    lateToday: 0,
    absentToday: 0,
    totalReports: 0,
  };

  const attendanceRate =
    stats.totalUsers > 0
      ? Math.round((stats.presentToday / stats.totalUsers) * 100)
      : 0;

  /**
   * UI SKELETON (Pas lagi narik data dari Matrix)
   */
  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <header className="space-y-2">
          <div className="h-8 w-64 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
          <div className="h-4 w-96 bg-zinc-100 dark:bg-zinc-900 rounded-lg" />
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card
              key={i}
              className="p-5 bg-white dark:bg-zinc-950 shadow-sm border-l-4 border-zinc-200 dark:border-zinc-800">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <div className="h-3 w-24 bg-zinc-100 dark:bg-zinc-900 rounded" />
                  <div className="h-8 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                </div>
                <div className="h-8 w-8 bg-zinc-100 dark:bg-zinc-900 rounded-full" />
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80 bg-zinc-100/50 dark:bg-zinc-900/20 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800" />
          <div className="h-80 bg-zinc-100/50 dark:bg-zinc-900/20 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Ringkasan Matrix Mapan
        </h1>
        <p className="text-sm text-zinc-500 font-medium">
          Dashboard kendali utama administrator untuk monitoring operasional
          harian.
        </p>
      </header>

      {/* Grid Statistik Utama */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 border-l-4 border-l-blue-600 bg-white dark:bg-zinc-950 shadow-sm transition-all hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Total Karyawan Aktif
              </p>
              <p className="text-3xl font-bold mt-1 text-zinc-900 dark:text-white">
                {stats.totalUsers}
              </p>
            </div>
            <Users className="text-zinc-300 dark:text-zinc-700" size={24} />
          </div>
        </Card>

        <Card className="p-5 border-l-4 border-l-green-600 bg-white dark:bg-zinc-950 shadow-sm transition-all hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Hadir Hari Ini
              </p>
              <p className="text-3xl font-bold mt-1 text-green-600">
                {stats.presentToday}
              </p>
            </div>
            <UserCheck className="text-green-600/20" size={24} />
          </div>
          <p className="text-[10px] text-zinc-400 mt-2 font-medium italic">
            Efektivitas: {attendanceRate}%
          </p>
        </Card>

        <Card className="p-5 border-l-4 border-l-amber-500 bg-white dark:bg-zinc-950 shadow-sm transition-all hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Karyawan Terlambat
              </p>
              <p className="text-3xl font-bold mt-1 text-amber-600">
                {stats.lateToday}
              </p>
            </div>
            <Clock className="text-amber-600/20" size={24} />
          </div>
        </Card>

        <Card className="p-5 border-l-4 border-l-rose-600 bg-white dark:bg-zinc-950 shadow-sm transition-all hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Total Semua Laporan
              </p>
              <p className="text-3xl font-bold mt-1 text-rose-600">
                {stats.totalReports}
              </p>
            </div>
            <AlertCircle className="text-rose-600/20" size={24} />
          </div>
        </Card>
      </div>

      {/* Visualisasi & Log Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-8 h-80 flex flex-col items-center justify-center border-dashed border-2 bg-zinc-50/30 dark:bg-zinc-900/10 hover:border-blue-500/50 transition-colors group">
          <ActivityIcon
            className="text-zinc-300 dark:text-zinc-700 mb-2 group-hover:text-blue-500 transition-colors"
            size={40}
          />
          <p className="text-zinc-400 text-sm font-medium">
            Visualisasi Chart Aktivitas
          </p>
          <span className="text-[9px] text-zinc-500 uppercase mt-1 tracking-widest font-bold underline decoration-blue-500/50 underline-offset-4">
            Coming Soon
          </span>
        </Card>

        <Card className="p-8 h-80 flex flex-col items-center justify-center border-dashed border-2 bg-zinc-50/30 dark:bg-zinc-900/10 hover:border-zinc-400 transition-colors">
          <div className="text-center">
            <p className="text-zinc-400 text-sm font-medium italic">
              Log Kejadian Terbaru
            </p>
            <div className="mt-4 flex flex-col items-center">
              <div className="w-12 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-2" />
              <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">
                Status: Kondusif
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
