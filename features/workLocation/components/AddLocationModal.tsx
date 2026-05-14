"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useWorkLocation } from "../hooks/useWorkLocation";
import { WORK_ROLES, IWorkLocation, WorkRole } from "../types";
import { toast } from "sonner";

export const AddLocationModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { createLocation } = useWorkLocation();
  const [formData, setFormData] = useState<Partial<IWorkLocation>>({
    code: "",
    name: "",
    role: "cleaning_service",
    radiusMeter: 100,
    center: { type: "Point", coordinates: [0, 0] },
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createLocation(formData as IWorkLocation);
    if (res.success) {
      toast.success(
        "Konfigurasi lokasi kerja berhasil disimpan ke dalam sistem.",
      );
      onClose();
    } else {
      toast.error(res.error || "Gagal menyimpan konfigurasi lokasi.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Registrasi Lokasi Kerja Baru"
      size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Kode Lokasi"
            placeholder="Contoh: AREA_PUSAT_01"
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
              Peruntukan Divisi
            </label>
            <select
              className="w-full h-11 px-3 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value as WorkRole,
                })
              }>
              {WORK_ROLES.map((role) => (
                <option key={role} value={role}>
                  {role.toUpperCase().replace("_", " ")}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Input
          label="Label Nama Lokasi"
          placeholder="Contoh: Gedung Rektorat Utama"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <div className="grid grid-cols-3 gap-4">
          <Input
            label="Garis Lintang (Lat)"
            type="number"
            step="any"
            placeholder="-7.000000"
            onChange={(e) => {
              const coords = formData.center?.coordinates || [0, 0];
              setFormData({
                ...formData,
                center: {
                  type: "Point",
                  coordinates: [coords[0], parseFloat(e.target.value)],
                },
              });
            }}
          />
          <Input
            label="Garis Bujur (Lng)"
            type="number"
            step="any"
            placeholder="110.000000"
            onChange={(e) => {
              const coords = formData.center?.coordinates || [0, 0];
              setFormData({
                ...formData,
                center: {
                  type: "Point",
                  coordinates: [parseFloat(e.target.value), coords[1]],
                },
              });
            }}
          />
          <Input
            label="Radius (Meter)"
            type="number"
            defaultValue={100}
            onChange={(e) =>
              setFormData({
                ...formData,
                radiusMeter: parseInt(e.target.value),
              })
            }
          />
        </div>

        <div className="pt-4 flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Batalkan
          </Button>
          <Button type="submit" className="flex-1">
            Simpan Konfigurasi
          </Button>
        </div>
      </form>
    </Modal>
  );
};
