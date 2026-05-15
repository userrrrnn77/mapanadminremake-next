// app/(dashboard)/profile/page.tsx
"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Mail,
  Phone,
  ShieldCheck,
  User as UserIcon,
  Calendar,
} from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-top-4 duration-700">
      {/* Header Profile */}
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Profil Saya
        </h1>
        <p className="text-sm text-zinc-500 font-medium">
          Informasi kredensial dan detail akun administrator.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Foto & Status */}
        <Card className="md:col-span-1 p-6 flex flex-col items-center text-center space-y-4 shadow-sm bg-white dark:bg-zinc-950">
          <div className="w-24 h-24 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center border-2 border-zinc-200 dark:border-zinc-800 overflow-hidden">
            {user?.profilePhoto?.url ? (
              <Image
                src={user.profilePhoto.url}
                alt="Profile"
                fill
                className="object-cover"
              />
            ) : (
              <UserIcon size={40} className="text-zinc-400" />
            )}
          </div>
          <div>
            <h2 className="font-bold text-lg">{user?.fullname}</h2>
            <p className="text-xs text-blue-600 font-bold uppercase tracking-widest">
              {user?.role}
            </p>
          </div>
          <div className="w-full pt-4 border-t dark:border-zinc-800 flex justify-center gap-2">
            <span className="px-3 py-1 bg-green-50 dark:bg-green-900/10 text-green-600 text-[10px] font-bold rounded-full border border-green-100 dark:border-green-900/20 uppercase">
              {user?.status || "Active"}
            </span>
          </div>
        </Card>

        {/* Card Detail Informasi */}
        <Card className="md:col-span-2 p-6 space-y-6 shadow-sm bg-white dark:bg-zinc-950">
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">
            Informasi Dasar
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-[10px] text-zinc-400 font-bold uppercase flex items-center gap-2">
                <Phone size={12} /> Nomor WhatsApp
              </p>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-200">
                {user?.phone || "-"}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] text-zinc-400 font-bold uppercase flex items-center gap-2">
                <ShieldCheck size={12} /> ID Karyawan
              </p>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-200">
                {
                  user?._id?.substring(0, 8).toUpperCase() || "-"
                  // Property '_id' does not exist on type 'IUser'.
                }
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] text-zinc-400 font-bold uppercase flex items-center gap-2">
                <Calendar size={12} /> Shift Kerja
              </p>
              <p className="text-sm font-medium capitalize text-zinc-900 dark:text-zinc-200">
                {user?.shift ? "-" : "-"}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] text-zinc-400 font-bold uppercase flex items-center gap-2">
                <Mail size={12} /> Status Akun
              </p>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-200">
                {user?.isVerified
                  ? "Terverifikasi Sistem"
                  : "Pending Verifikasi"}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t dark:border-zinc-800">
            <Button className="w-full sm:w-auto" variant="outline">
              Edit Profil (Coming Soon)
            </Button>
          </div>
        </Card>
      </div>

      <div className="p-4 bg-zinc-100 dark:bg-zinc-900/50 rounded-xl text-center">
        <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">
          Terakhir diperbarui:{" "}
          {new Date().toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
