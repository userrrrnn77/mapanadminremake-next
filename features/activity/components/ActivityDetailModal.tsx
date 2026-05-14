"use client";

import Image from "next/image"; // Import ini bre, hukumnya wajib!
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { IActivity } from "../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activity: IActivity | null;
}

export const ActivityDetailModal = ({ isOpen, onClose, activity }: Props) => {
  if (!activity) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Detail Dokumentasi Lapangan"
      size="lg"
      footer={<Button onClick={onClose}>Tutup</Button>}>
      <div className="space-y-6">
        {/* Info User */}
        <div className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl uppercase">
            {activity.user.fullname[0]}
          </div>
          <div>
            <p className="font-bold text-zinc-900 dark:text-zinc-100">
              {activity.user.fullname}
            </p>
            <p className="text-xs text-zinc-500">
              {new Date(activity.activityTime).toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        {/* List Foto & Caption */}
        <div className="grid grid-cols-1 gap-8">
          {activity.documentation.map((doc, index) => (
            <div
              key={index}
              className="space-y-3 border-b dark:border-zinc-800 pb-6 last:border-0">
              {/* Container Image harus Relative kalo pake layout fill/responsive */}
              <div className="relative w-full aspect-video overflow-hidden rounded-xl border dark:border-zinc-700 shadow-md">
                <Image
                  src={doc.photo.url}
                  alt={`Dokumentasi ${activity.user.fullname} - ${index}`}
                  fill // Biar ngikutin ukuran container-nya bre
                  className="object-cover transition-transform hover:scale-105 duration-500"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority={index === 0} // Foto pertama langsung load, sisanya lazy
                />
              </div>

              <div className="bg-zinc-100 dark:bg-zinc-800/50 p-4 rounded-xl border-l-4 border-blue-500">
                <p className="text-sm italic text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  &ldquo;{doc.caption}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lokasi */}
        <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl text-[11px] text-zinc-500 space-y-1">
          <p className="flex items-center gap-2">
            <span className="text-base">📍</span>{" "}
            {activity.address || "Lokasi tidak terdeteksi"}
          </p>
          <p className="flex items-center gap-2">
            <span className="text-base">🌐</span> Koordinat:{" "}
            {activity.location.coordinates[1]},{" "}
            {activity.location.coordinates[0]}
          </p>
        </div>
      </div>
    </Modal>
  );
};
