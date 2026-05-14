"use client";

import React, { useState } from "react";
import { IReport } from "../types";
import { DataTable } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { ReportDetailModal } from "./ReportDetailModal";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Props {
  data: IReport[];
  isLoading?: boolean;
}

export const ReportTable = ({ data, isLoading }: Props) => {
  const [selected, setSelected] = useState<IReport | null>(null);

  const exportDailyReportPDF = () => {
    const doc = new jsPDF();
    const today = new Date().toLocaleDateString("id-ID");

    const todayData = data.filter((item) => {
      const reportDate = new Date(item.reportTime).toLocaleDateString("id-ID");
      return reportDate === today;
    });

    if (todayData.length === 0) {
      alert("Tidak ada laporan masuk untuk hari ini.");
      return;
    }

    doc.setFontSize(16);
    doc.text("LAPORAN PENGADUAN HARIAN - MAPAN RAJASA", 14, 15);
    doc.setFontSize(10);
    doc.text(`Tanggal: ${today}`, 14, 22);

    const rows = todayData.map((r) => [
      r.user.fullname,
      r.description,
      r.status.toUpperCase(),
      new Date(r.reportTime).toLocaleTimeString("id-ID"),
    ]);

    autoTable(doc, {
      startY: 30,
      head: [["Pelapor", "Deskripsi Laporan", "Status", "Jam"]],
      body: rows,
      theme: "grid",
      headStyles: { fillColor: [220, 38, 38] }, // Warna merah tegas
    });

    doc.save(`Laporan_Pengaduan_${today.replace(/\//g, "-")}.pdf`);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Daftar Pengaduan</h2>
        <Button variant="danger" size="sm" onClick={exportDailyReportPDF}>
          📄 Export Laporan Hari Ini
        </Button>
      </div>

      <DataTable
        headers={["Pelapor", "Deskripsi", "Status", "Aksi"]}
        data={data}
        isLoading={isLoading}
        renderRow={(item) => (
          <tr
            key={item._id}
            className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
            <td className="p-4">
              <p className="font-bold">{item.user.fullname}</p>
              <p className="text-[10px] text-zinc-500">
                {item.address || "No Address"}
              </p>
            </td>
            <td className="p-4 max-w-xs truncate text-sm">
              {item.description}
            </td>
            <td className="p-4">
              <StatusBadge status={item.status} />
            </td>
            <td className="p-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelected(item)}>
                Detail
              </Button>
            </td>
          </tr>
        )}
        renderCard={(item) => (
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <span className="font-bold text-sm">{item.user.fullname}</span>
              <StatusBadge status={item.status} />
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
              {item.description}
            </p>
            <Button
              className="w-full h-8 text-xs"
              onClick={() => setSelected(item)}>
              Lihat Detail Laporan
            </Button>
          </div>
        )}
      />

      <ReportDetailModal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        report={selected}
      />
    </div>
  );
};

const StatusBadge = ({ status }: { status: IReport["status"] }) => {
  const styles = {
    open: "bg-blue-100 text-blue-700",
    in_progress: "bg-yellow-100 text-yellow-700",
    resolved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${styles[status]}`}>
      {status.replace("_", " ")}
    </span>
  );
};
