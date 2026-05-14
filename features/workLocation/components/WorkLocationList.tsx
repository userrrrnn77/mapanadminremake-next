"use client";

import React from "react";
import { IWorkLocationFE } from "../types";
import { LocationCard } from "./LocationCard";
import { Button } from "@/components/ui/Button";

interface Props {
  locations: IWorkLocationFE[];
  isLoading: boolean;
  onUpdate: (id: string, data: Partial<IWorkLocationFE>) => void;
  onAdd: () => void;
}

export const WorkLocationList = ({
  locations,
  isLoading,
  onUpdate,
  onAdd,
}: Props) => {
  if (isLoading)
    return (
      <div className="p-10 text-center animate-pulse text-zinc-500 font-medium">
        Menyinkronkan data lokasi...
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Konfigurasi Lokasi Kerja</h2>
          <p className="text-sm text-zinc-500 font-medium">
            Manajemen Geofencing & Penugasan Shift Kuli
          </p>
        </div>
        <Button onClick={onAdd}>+ Tambah Lokasi Baru</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {locations.map((loc) => (
          <LocationCard key={loc._id} location={loc} onUpdate={onUpdate} />
        ))}

        {locations.length === 0 && (
          <div className="col-span-full p-20 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-center">
            <p className="text-zinc-500 font-medium">
              Belum ada lokasi kerja yang dikonfigurasi.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
