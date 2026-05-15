"use client";

import { useEffect, useState } from "react";
import { useWorkLocation } from "@/features/workLocation/hooks/useWorkLocation";
import { WorkLocationList } from "@/features/workLocation/components/WorkLocationList";
import { AddLocationModal } from "@/features/workLocation/components/AddLocationModal";
import { toast } from "sonner";
import { IWorkLocationFE } from "@/features/workLocation/types";

export default function LocationsPage() {
  const { locations, isLoading, fetchAllLocations, updateLocation } =
    useWorkLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAllLocations();
  }, [fetchAllLocations]);

  /**
   * Handler untuk mengupdate status aktif/non-aktif lokasi atau data lainnya.
   */
  const handleUpdateLocation = async (
    id: string,
    data: Partial<IWorkLocationFE>,
  ) => {
    const res = await updateLocation(id, data);
    if (res.success) {
      toast.success(
        "Konfigurasi lokasi berhasil diperbarui secara profesional.",
      );
    } else {
      toast.error(res.error || "Gagal memperbarui konfigurasi lokasi.");
    }
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-700">
      {/* Header Halaman dengan Informasi Ringkas */}
      <header className="border-b dark:border-zinc-800 pb-4">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Konfigurasi Wilayah & Geofencing
        </h1>
        <p className="text-sm text-zinc-500 font-medium">
          Atur koordinat pusat, radius absensi, dan jadwal operasional unit
          kerja.
        </p>
      </header>

      {/* Main List: Menampilkan Card Grid sesuai referensi UI yang lu mau */}
      <WorkLocationList
        locations={locations}
        isLoading={isLoading}
        onUpdate={handleUpdateLocation}
        onAdd={() => setIsModalOpen(true)}
      />

      {/* Modal untuk Menambah Area Kerja Baru */}
      <AddLocationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Catatan Teknis untuk Admin */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
        <p className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest mb-1">
          Catatan Teknis Geofencing
        </p>
        <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Pastikan koordinat (Latitude & Longitude) akurat sesuai titik tengah
          lokasi. Radius absensi disarankan minimal 50-100 meter untuk
          menghindari deviasi akurasi GPS pada perangkat mobile.
        </p>
      </div>
    </div>
  );
}
