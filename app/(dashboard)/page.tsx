// app/(dashboard)/page.tsx

"use client";

import { Card } from "@/components/ui/Card";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Ringkasan Matrix</h1>
        <p className="text-sm text-zinc-500">
          Selamat datang kembali, Admin Elit.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Placeholder Stats - Nanti ambil dari masing-masing hook */}
        <Card className="p-6 border-l-4 border-l-blue-600">
          <p className="text-xs font-bold text-zinc-400 uppercase">
            Total Kuli Aktif
          </p>
          <p className="text-3xl font-bold mt-2">128</p>
        </Card>
        <Card className="p-6 border-l-4 border-l-orange-600">
          <p className="text-xs font-bold text-zinc-400 uppercase">
            Laporan Hari Ini
          </p>
          <p className="text-3xl font-bold mt-2">12</p>
        </Card>
        <Card className="p-6 border-l-4 border-l-green-600">
          <p className="text-xs font-bold text-zinc-400 uppercase">
            Kehadiran Hari Ini
          </p>
          <p className="text-3xl font-bold mt-2">98%</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 h-75 flex items-center justify-center border-dashed border-2">
          <p className="text-zinc-400 italic">
            Chart Aktivitas Mingguan (Placeholder)
          </p>
        </Card>
        <Card className="p-6 h-75 flex items-center justify-center border-dashed border-2">
          <p className="text-zinc-400 italic">
            Log Kejadian Terbaru (Placeholder)
          </p>
        </Card>
      </div>
    </div>
  );
}
