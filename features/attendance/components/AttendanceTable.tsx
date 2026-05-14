"use client";

import React, { useState } from "react";
import { IAttendanceFE } from "../types";
import { DataTable } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { AttendanceDetailModal } from "./AttendanceDetailModal";

interface Props {
  data: IAttendanceFE[];
  isLoading?: boolean;
}

export const AttendanceTable = ({ data, isLoading }: Props) => {
  const [selected, setSelected] = useState<IAttendanceFE | null>(null);

  return (
    <>
      <DataTable
        headers={["Kuli", "Tipe", "Waktu", "Status", "Penalty", "Aksi"]}
        data={data}
        isLoading={isLoading}
        renderRow={(item) => (
          <tr
            key={item._id}
            className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
            <td className="p-4">
              <p className="font-bold">{item.user.name}</p>
              <p className="text-[10px] text-zinc-500">@{item.user.username}</p>
            </td>
            <td className="p-4 uppercase text-xs font-semibold">{item.type}</td>
            <td className="p-4">
              <p className="text-sm">
                {item.checkIn
                  ? new Date(item.checkIn).toLocaleTimeString()
                  : "-"}
              </p>
              <p className="text-[10px] text-zinc-400">{item.shift || "N/A"}</p>
            </td>
            <td className="p-4">
              <AttendanceStatusBadge status={item.status} />
            </td>
            <td className="p-4 text-red-500 font-mono text-sm">
              {item.penalty > 0 ? `-${item.penalty.toLocaleString()}` : "0"}
            </td>
            <td className="p-4">
              <Button
                //   Type '{ children: string; size: string; variant: "outline"; onClick: () => void; }' is not assignable to type 'IntrinsicAttributes & ButtonProps'.
                //   Property 'size' does not exist on type 'IntrinsicAttributes & ButtonProps'.
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
            <div className="flex justify-between">
              <span className="font-bold">{item.user.name}</span>
              <AttendanceStatusBadge status={item.status} />
            </div>
            <div className="grid grid-cols-2 text-xs gap-2">
              <div className="text-zinc-500">
                Tipe:{" "}
                <span className="text-zinc-900 dark:text-zinc-100 uppercase">
                  {item.type}
                </span>
              </div>
              <div className="text-zinc-500">
                Penalty:{" "}
                <span className="text-red-500">
                  Rp {item.penalty.toLocaleString()}
                </span>
              </div>
            </div>
            <Button
              className="w-full h-8 text-xs"
              onClick={() => setSelected(item)}>
              Lihat Bukti Absen
            </Button>
          </div>
        )}
      />

      <AttendanceDetailModal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        attendance={selected}
      />
    </>
  );
};

// Sub-component Badge biar rapi
const AttendanceStatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    tepat_waktu:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    terlambat: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    lembur: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    sakit:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  };
  return (
    <span
      className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${styles[status] || "bg-zinc-100"}`}>
      {status.replace("_", " ")}
    </span>
  );
};
