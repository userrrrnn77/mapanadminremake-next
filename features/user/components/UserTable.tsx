"use client";

import React, { useState, useMemo } from "react";
import { IUser } from "../types";
import { DataTable } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { UserDetailModal } from "./UserDetailModal";
import { MapPin, ShieldAlert, ShieldCheck } from "lucide-react";

interface Props {
  data: IUser[];
  isLoading?: boolean;
}

export const UserTable = ({ data, isLoading }: Props) => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const displayData = useMemo(() => {
    return data.filter((user) => user.role !== "admin");
  }, [data]);

  return (
    <div className="space-y-4">
      <DataTable
        headers={[
          "Karyawan Mapan",
          "Jabatan",
          "Lokasi Tugas",
          "Status",
          "Aksi",
        ]}
        data={displayData}
        isLoading={isLoading}
        renderRow={(user) => {
          // Logic ambil nama lokasi dari array index pertama
          const locationName =
            Array.isArray(user.assignedWorkLocations) &&
            user.assignedWorkLocations.length > 0
              ? user.assignedWorkLocations[0].name
              : "Belum Ditugaskan";

          return (
            <tr
              key={user._id}
              className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors border-b dark:border-zinc-900 last:border-0">
              <td className="p-4">
                <div className="flex flex-col">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">
                    {user.fullname}
                  </span>
                  <span className="text-[11px] text-zinc-500 font-medium tracking-tight">
                    {user.phone}
                  </span>
                </div>
              </td>
              <td className="p-4 text-[10px]">
                <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold rounded uppercase tracking-wider">
                  {user.role.replace("_", " ")}
                </span>
              </td>
              <td className="p-4 text-sm">
                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 font-medium">
                  <MapPin size={14} className="text-blue-500" />
                  {locationName}
                </div>
              </td>
              <td className="p-4">
                <UserStatusBadge
                  status={user.status}
                  isVerified={user.isVerified}
                />
              </td>
              <td className="p-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs font-bold border-zinc-200 dark:border-zinc-800 hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:text-blue-600 transition-all"
                  onClick={() => setSelectedUser(user)}>
                  Atur Tugas
                </Button>
              </td>
            </tr>
          );
        }}
        renderCard={(user) => {
          // Samain logic lokasi buat tampilan mobile card
          const locationName =
            Array.isArray(user.assignedWorkLocations) &&
            user.assignedWorkLocations.length > 0
              ? user.assignedWorkLocations[0].name
              : "Belum Ditugaskan";

          return (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 italic">
                    {user.fullname}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                    {user.role.replace("_", " ")}
                  </span>
                </div>
                <UserStatusBadge
                  status={user.status}
                  isVerified={user.isVerified}
                />
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50 p-2 rounded-lg border border-zinc-100 dark:border-zinc-800">
                <MapPin size={12} className="text-blue-500" />
                <span className="truncate">{locationName}</span>
              </div>
              <Button
                className="w-full h-10 text-xs font-bold uppercase tracking-widest shadow-sm"
                onClick={() => setSelectedUser(user)}>
                Lihat Detail & Atur
              </Button>
            </div>
          );
        }}
      />

      <UserDetailModal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        user={selectedUser}
      />
    </div>
  );
};

const UserStatusBadge = ({
  status,
  isVerified,
}: {
  status: string;
  isVerified: boolean;
}) => {
  if (!isVerified)
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-[9px] font-black bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50 uppercase tracking-tighter">
        <ShieldAlert size={10} /> UNVERIFIED
      </span>
    );

  const isActive = status === "active";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[9px] font-black border uppercase tracking-tighter ${
        isActive
          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800/50"
          : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200 dark:border-rose-800/50"
      }`}>
      {isActive ? <ShieldCheck size={10} /> : <ShieldAlert size={10} />}
      {status}
    </span>
  );
};
