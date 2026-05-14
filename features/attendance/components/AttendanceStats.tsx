"use client";

import { Card } from "@/components/ui/Card";

// Kita definisikan kontrak datanya di sini bre biar TS insyaf
interface AttendanceStatsProps {
  stats: {
    totalTelat: number;
    totalTepatWaktu: number;
    totalPenalty: number;
    totalLembur?: number; // Opsional dulu kalo belum ada logic-nya
  };
}

export const AttendanceStats = ({ stats }: AttendanceStatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card className="p-4 border-l-4 border-l-green-500">
        <p className="text-[10px] sm:text-xs text-zinc-500 uppercase font-bold tracking-wider">
          Tepat Waktu
        </p>
        <p className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          {stats.totalTepatWaktu}
        </p>
      </Card>

      <Card className="p-4 border-l-4 border-l-red-500">
        <p className="text-[10px] sm:text-xs text-zinc-500 uppercase font-bold tracking-wider">
          Terlambat
        </p>
        <p className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          {stats.totalTelat}
        </p>
      </Card>

      <Card className="p-4 border-l-4 border-l-blue-500">
        <p className="text-[10px] sm:text-xs text-zinc-500 uppercase font-bold tracking-wider">
          Total Lembur
        </p>
        <p className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          {stats.totalLembur || 0}
        </p>
      </Card>

      <Card className="p-4 border-l-4 border-l-orange-500">
        <p className="text-[10px] sm:text-xs text-zinc-500 uppercase font-bold tracking-wider">
          Total Denda
        </p>
        <p className="text-lg sm:text-xl font-bold text-red-600">
          Rp {stats.totalPenalty.toLocaleString("id-ID")}
        </p>
      </Card>
    </div>
  );
};
