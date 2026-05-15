"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/features/user/hooks/useUser";
import { UserTable } from "@/features/user/components/UserTable";
import { AddUserModal } from "@/features/user/components/AddUserModal";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function UsersPage() {
  const { users, isLoading, fetchAllUsers } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  /**
   * Menghitung statistik pengguna untuk ringkasan di bagian atas.
   */
  const stats = {
    total: users.length,
    verified: users.filter((u) => u.isVerified).length,
    active: users.filter((u) => u.status === "active").length,
    unverified: users.filter((u) => !u.isVerified).length,
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Bagian Judul dan Aksi Tambah User */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Manajemen Karyawan
          </h1>
          <p className="text-sm text-zinc-500 font-medium">
            Kelola data akun kuli, peran jabatan, dan status verifikasi akses.
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="w-full md:w-auto">
          + Daftarkan Kuli Baru
        </Button>
      </header>

      {/* Ringkasan Statistik User */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-blue-600 shadow-sm bg-white dark:bg-zinc-900">
          <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
            Total Karyawan
          </p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-green-500 shadow-sm bg-white dark:bg-zinc-900">
          <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
            Status Aktif
          </p>
          <p className="text-2xl font-bold">{stats.active}</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-indigo-500 shadow-sm bg-white dark:bg-zinc-900">
          <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
            Terverifikasi
          </p>
          <p className="text-2xl font-bold">{stats.verified}</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-orange-500 shadow-sm bg-white dark:bg-zinc-900">
          <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
            Pending
          </p>
          <p className="text-2xl font-bold">{stats.unverified}</p>
        </Card>
      </div>

      {/* Tabel Utama Daftar User */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
        <UserTable data={users} isLoading={isLoading} />
      </div>

      {/* Modal Tambah User Baru */}
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
