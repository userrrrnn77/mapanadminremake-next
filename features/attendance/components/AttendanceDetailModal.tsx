"use client";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { IAttendanceFE } from "../types";
import Image from "next/image";

export const AttendanceDetailModal = ({
  isOpen,
  onClose,
  attendance,
}: {
  isOpen: boolean;
  onClose: () => void;
  attendance: IAttendanceFE | null;
}) => {
  if (!attendance) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Detail Absensi"
      size="lg"
      footer={<Button onClick={onClose}>Tutup</Button>}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Selfie Bukti */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-400 uppercase">
            Foto Selfie
          </label>
          <div className="relative aspect-3/4 rounded-xl overflow-hidden border dark:border-zinc-800">
            <Image
              src={attendance.photo.url}
              alt="Selfie"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Info Detail */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
              Catatan Kuli
            </label>
            <p className="text-sm bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg mt-1 italic">
              &quot;{attendance.note || "Gak ada catatan"}&ldquo;
            </p>
          </div>

          <div className="p-4 border dark:border-zinc-800 rounded-xl space-y-3 text-sm">
            <div className="flex justify-between text-zinc-500">
              <span>Jarak dari Kantor:</span>
              <span className="text-zinc-900 dark:text-zinc-100 font-mono">
                {attendance.distanceFromCenter?.toFixed(2)} meter
              </span>
            </div>
            <div className="flex justify-between text-zinc-500">
              <span>Menit Terlambat:</span>
              <span className="text-red-500 font-mono">
                {attendance.lateMinutes} Menit
              </span>
            </div>
            <div className="flex justify-between text-zinc-500 font-bold border-t dark:border-zinc-800 pt-2">
              <span>Potongan Gaji:</span>
              <span className="text-red-600">
                Rp {attendance.penalty.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="text-[10px] text-zinc-400">
            📍 Lokasi: {attendance.location.coordinates[1]},{" "}
            {attendance.location.coordinates[0]}
            <br />
            🏠 Work Location: {attendance.locationSnapshot?.name || "Luar Area"}
          </div>
        </div>
      </div>
    </Modal>
  );
};
