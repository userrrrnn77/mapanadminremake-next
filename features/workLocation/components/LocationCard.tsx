"use client";

import React from "react";
import { IWorkLocationFE, ShiftTime } from "../types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface Props {
  location: IWorkLocationFE;
  onUpdate: (id: string, data: Partial<IWorkLocationFE>) => void;
  onDelete?: (id: string) => void;
}

export const LocationCard = ({ location, onUpdate, onDelete }: Props) => {
  return (
    <Card className="p-6 space-y-6 border-t-4 border-t-blue-600 shadow-lg bg-white dark:bg-zinc-900">
      {/* Bagian Informasi Utama */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            {location.code}
          </h3>
          <p className="text-sm text-zinc-500 font-medium">{location.name}</p>
        </div>
        <div className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
          {location.role.replace("_", " ")}
        </div>
      </div>

      {/* Konfigurasi Geofencing */}
      <div className="grid grid-cols-2 gap-4 bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
        <div className="space-y-1">
          <p className="text-[10px] text-zinc-400 uppercase font-bold">
            Latitude
          </p>
          <p className="text-xs font-mono text-zinc-700 dark:text-zinc-300">
            {location.center.coordinates[1]}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] text-zinc-400 uppercase font-bold">
            Longitude
          </p>
          <p className="text-xs font-mono text-zinc-700 dark:text-zinc-300">
            {location.center.coordinates[0]}
          </p>
        </div>
        <div className="col-span-2 pt-2 border-t dark:border-zinc-700">
          <p className="text-[10px] text-zinc-400 uppercase font-bold">
            Radius Absensi
          </p>
          <p className="text-xs text-zinc-700 dark:text-zinc-300 font-semibold">
            {location.radiusMeter} Meter
          </p>
        </div>
      </div>

      {/* Konfigurasi Jadwal Shift */}
      <div className="space-y-4">
        <ShiftSection
          title="Konfigurasi Hari Kerja (Weekday)"
          config={location.shiftConfigs.weekday}
          color="blue"
        />
        <ShiftSection
          title="Konfigurasi Akhir Pekan (Weekend)"
          config={location.shiftConfigs.weekend}
          color="orange"
        />
      </div>

      {/* Tombol Aksi */}
      <div className="flex gap-2 pt-4 border-t dark:border-zinc-800">
        <Button
          variant="danger"
          size="sm"
          className="flex-1"
          onClick={() => onDelete && onDelete(location._id)}>
          Hapus Lokasi
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="flex-1"
          onClick={() =>
            onUpdate(location._id, { isActive: !location.isActive })
          }>
          Simpan Perubahan
        </Button>
      </div>
    </Card>
  );
};

interface ShiftSectionProps {
  title: string;
  config: { pagi: ShiftTime; siang: ShiftTime; malam: ShiftTime };
  color: "blue" | "orange";
}

const ShiftSection = ({ title, config, color }: ShiftSectionProps) => {
  const formatShift = (time: ShiftTime) => {
    const start = `${time.hour.toString().padStart(2, "0")}:${time.minute.toString().padStart(2, "0")}`;
    const end = `${time.endHour.toString().padStart(2, "0")}:${time.endMinute.toString().padStart(2, "0")}`;
    return `${start} - ${end}`;
  };

  return (
    <div className="space-y-2">
      <p
        className={`text-[10px] font-bold uppercase tracking-widest ${color === "blue" ? "text-blue-500" : "text-orange-500"}`}>
        {title}
      </p>
      <div className="grid grid-cols-3 gap-2 text-[10px]">
        <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-800">
          <p className="text-zinc-400">Pagi</p>
          <p className="font-bold">{formatShift(config.pagi)}</p>
        </div>
        <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-800">
          <p className="text-zinc-400">Siang</p>
          <p className="font-bold">{formatShift(config.siang)}</p>
        </div>
        <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-800">
          <p className="text-zinc-400">Malam</p>
          <p className="font-bold">{formatShift(config.malam)}</p>
        </div>
      </div>
    </div>
  );
};
