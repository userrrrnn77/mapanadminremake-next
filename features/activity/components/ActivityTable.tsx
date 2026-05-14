"use client";

import React from "react";
import { IActivity } from "../types";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { DataTable } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

interface Props {
  data: IActivity[];
  isLoading?: boolean;
}

export const ActivityTable = ({ data, isLoading }: Props) => {
  const exportDailyPDF = () => {
    const doc = new jsPDF();
    const today = new Date().toLocaleDateString("id-ID");

    // 1. Filter data: Cuma yang tanggalnya HARI INI
    const todayData = data.filter((act) => {
      const actDate = new Date(act.activityTime).toLocaleDateString("id-ID");
      return actDate === today;
    });

    if (todayData.length === 0) {
      toast.info(
        "Gak ada aktivitas hari ini, Bre! Karyawan lu pada molor kali, aokwaokwa",
      );
      return;
    }

    // 2. Setup Header PDF
    doc.setFontSize(16);
    doc.text("LAPORAN HARIAN AKTIVITAS Karyawan", 14, 15);
    doc.setFontSize(10);
    doc.text(`Unit: Mapan Rajasa Control Center`, 14, 22);
    doc.text(`Tanggal Laporan: ${today}`, 14, 27);

    // 3. Mapping Data ke Row Tabel PDF
    const tableRows = todayData.map((act) => [
      act.user.fullname,
      act.title,
      act.address || "-",
      new Date(act.activityTime).toLocaleTimeString("id-ID"),
      act.documentation.length + " Foto",
    ]);

    // 4. Generate AutoTable
    autoTable(doc, {
      startY: 35,
      head: [["Nama Karyawan", "Kegiatan", "Lokasi", "Jam", "Lampiran"]],
      body: tableRows,
      theme: "grid",
      headStyles: { fillColor: [37, 99, 235] }, // Biru Mapan
      styles: { fontSize: 8 },
    });

    doc.save(`Laporan_Harian_${today.replace(/\//g, "-")}.pdf`);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-white dark:bg-zinc-900 p-4 rounded-xl border dark:border-zinc-800">
        <div>
          <h2 className="text-lg font-bold">Log Aktivitas</h2>
          <p className="text-xs text-zinc-500">
            Total {data.length} data tersinkronisasi
          </p>
        </div>
        <Button
          variant="success"
          onClick={exportDailyPDF}
          className="text-xs sm:text-sm">
          📄 Export Hari Ini
        </Button>
      </div>

      <DataTable
        headers={["Karyawan", "Kegiatan", "Waktu", "Status"]}
        data={data}
        isLoading={isLoading}
        // DESKTOP VIEW
        renderRow={(act) => (
          <tr
            key={act._id}
            className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition">
            <td className="p-4 font-medium">{act.user.fullname}</td>
            <td className="p-4">{act.title}</td>
            <td className="p-4 text-sm text-zinc-500">
              {new Date(act.activityTime).toLocaleString("id-ID")}
            </td>
            <td className="p-4">
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-md text-[10px] font-bold uppercase">
                Terkirim
              </span>
            </td>
          </tr>
        )}
        // MOBILE VIEW (CARDS)
        renderCard={(act) => (
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <p className="font-bold text-blue-600">{act.user.fullname}</p>
              <span className="text-[10px] text-zinc-400">
                {new Date(act.activityTime).toLocaleTimeString("id-ID")}
              </span>
            </div>
            <p className="text-sm text-zinc-800 dark:text-zinc-200">
              {act.title}
            </p>
            <div className="flex justify-between items-center pt-2 border-t dark:border-zinc-800">
              <span className="text-[10px] text-zinc-500 italic truncate w-40">
                {act.address}
              </span>
              <Button variant="outline" className="text-[10px] h-7 px-2">
                Detail
              </Button>
            </div>
          </div>
        )}
      />
    </div>
  );
};
