"use client";

import React, { useState } from "react";
import { IUser } from "../types";
import { DataTable } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { UserDetailModal } from "./UserDetailModal";

interface Props {
  data: IUser[];
  isLoading?: boolean;
}

export const UserTable = ({ data, isLoading }: Props) => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  return (
    <div className="space-y-4">
      <DataTable
        headers={["Kuli Mapan", "Jabatan", "Lokasi Tugas", "Status", "Aksi"]}
        data={data}
        isLoading={isLoading}
        renderRow={(user) => (
          <tr
            key={user._id}
            className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
            <td className="p-4">
              <div className="flex flex-col">
                <span className="font-bold text-zinc-900 dark:text-zinc-100">
                  {user.fullname}
                </span>
                <span className="text-xs text-zinc-500">{user.phone}</span>
              </div>
            </td>
            <td className="p-4 text-sm font-medium uppercase text-zinc-600 dark:text-zinc-400">
              {user.role.replace("_", " ")}
            </td>
            <td className="p-4 text-sm">
              {user.assignedWorkLocations?.name || "Belum Ditugaskan"}
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
                onClick={() => setSelectedUser(user)}>
                Atur Tugas
              </Button>
            </td>
          </tr>
        )}
        renderCard={(user) => (
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="font-bold">{user.fullname}</span>
                <span className="text-[10px] text-zinc-500">
                  {user.role.toUpperCase()}
                </span>
              </div>
              <UserStatusBadge
                status={user.status}
                isVerified={user.isVerified}
              />
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400">
              📍 {user.assignedWorkLocations?.name || "Tanpa Lokasi"}
            </div>
            <Button
              className="w-full h-9 text-xs"
              onClick={() => setSelectedUser(user)}>
              Lihat Detail & Atur
            </Button>
          </div>
        )}
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
      <span className="px-2 py-1 rounded text-[10px] font-bold bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
        UNVERIFIED
      </span>
    );

  return (
    <span
      className={`px-2 py-1 rounded text-[10px] font-bold ${
        status === "active"
          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      }`}>
      {status.toUpperCase()}
    </span>
  );
};
