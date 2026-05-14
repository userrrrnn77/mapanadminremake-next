"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useUser } from "../hooks/useUser";
import { toast } from "sonner";

export const AddUserModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { createNewUser } = useUser();
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    password: "",
    username: "",
    role: "street",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createNewUser({
      ...formData,
      assignedWorkLocations: [], // Diinisialisasi kosong dulu
    });

    if (res.success) {
      toast.success("Kuli baru berhasil didaftarkan ke sistem Mapan Rajasa.");
      onClose();
    } else {
      toast.error(res.error || "Gagal mendaftarkan kuli.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Daftarkan Kuli Baru"
      size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nama Lengkap"
          placeholder="Masukkan nama sesuai KTP"
          required
          onChange={(e) =>
            setFormData({ ...formData, fullname: e.target.value })
          }
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Nomor WhatsApp"
            type="tel"
            placeholder="0812..."
            required
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          <Input
            label="Username"
            placeholder="kuli_mapan"
            required
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        </div>
        <Input
          label="Kata Sandi Awal"
          type="password"
          placeholder="••••••••"
          required
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <div className="pt-4">
          <Button type="submit" className="w-full">
            Konfirmasi Pendaftaran
          </Button>
        </div>
      </form>
    </Modal>
  );
};
