"use client";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { IUser, USER_ROLES } from "../types";
import { useUser } from "../hooks/useUser";
import Image from "next/image";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: IUser | null;
}

export const UserDetailModal = ({ isOpen, onClose, user }: Props) => {
  const { assignUser } = useUser();

  if (!user) return null;

  const handleUpdateRole = async (newRole: string) => {
    const res = await assignUser(user._id, { role: newRole });
    if (res.success) {
      toast.success("Peran kuli berhasil diperbarui secara profesional.");
      onClose();
    } else {
      toast.error(res.error || "Gagal memperbarui peran.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Manajemen Profil Kuli" size="lg">
      <div className="space-y-6">
        {/* Header Profil */}
        <div className="flex items-center gap-6 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white dark:border-zinc-700 shadow-md">
            <Image 
              src={user.profilePhoto?.url || "/default-avatar.png"} 
              alt="Profil" 
              fill 
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold">{user.fullname}</h3>
            <p className="text-sm text-zinc-500">ID: {user._id.slice(-8).toUpperCase()}</p>
            <p className="text-xs font-mono text-blue-600 mt-1">{user.phone}</p>
          </div>
        </div>

        {/* Informasi Kepegawaian */}
        <div className="grid grid-cols-2 gap-4">
          <InfoItem label="Gaji Pokok" value={`Rp ${user.basicSalary.toLocaleString("id-ID")}`} />
          <InfoItem label="Shift Kerja" value={user.shift.toUpperCase()} />
          <InfoItem label="BPJS Kesehatan" value={user.bpjsKesehatan ? "Aktif" : "Tidak"} />
          <InfoItem label="BPJS Ketenagakerjaan" value={user.bpjsKetenagakerjaan ? "Aktif" : "Tidak"} />
        </div>

        {/* Pengaturan Peran */}
        <div className="space-y-3 pt-4 border-t dark:border-zinc-800">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest text-center block">
            Ubah Peran Pekerjaan
          </label>
          <div className="flex flex-wrap gap-2 justify-center">
            {USER_ROLES.map((role) => (
              <Button
                key={role}
                variant={user.role === role ? "primary" : "outline"}
                size="sm"
                className="capitalize"
                onClick={() => handleUpdateRole(role)}
              >
                {role.replace("_", " ")}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="p-3 bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-xl">
    <p className="text-[10px] text-zinc-500 uppercase font-bold">{label}</p>
    <p className="text-sm font-semibold mt-1">{value}</p>
  </div>
);