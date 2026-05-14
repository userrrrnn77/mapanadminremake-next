"use client";

import { Card } from "@/components/ui/Card";
import { IReport } from "../types";

export const ReportStats = ({ data }: { data: IReport[] }) => {
  const stats = {
    total: data.length,
    open: data.filter((r) => r.status === "open").length,
    resolved: data.filter((r) => r.status === "resolved").length,
    inProgress: data.filter((r) => r.status === "in_progress").length,
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="p-4 border-l-4 border-l-blue-500">
        <p className="text-[10px] text-zinc-500 uppercase font-bold">
          Total Laporan
        </p>
        <p className="text-2xl font-bold">{stats.total}</p>
      </Card>
      <Card className="p-4 border-l-4 border-l-yellow-500">
        <p className="text-[10px] text-zinc-500 uppercase font-bold">
          Menunggu
        </p>
        <p className="text-2xl font-bold">{stats.open}</p>
      </Card>
      <Card className="p-4 border-l-4 border-l-orange-500">
        <p className="text-[10px] text-zinc-500 uppercase font-bold">
          Diproses
        </p>
        <p className="text-2xl font-bold">{stats.inProgress}</p>
      </Card>
      <Card className="p-4 border-l-4 border-l-green-500">
        <p className="text-[10px] text-zinc-500 uppercase font-bold">Selesai</p>
        <p className="text-2xl font-bold">{stats.resolved}</p>
      </Card>
    </div>
  );
};
