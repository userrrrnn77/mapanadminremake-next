// app/(dashboard)/layout.tsx

"use client";

import { MainLayout } from "@/components/ui/MainLayout";
import { AuthGuard } from "@/features/auth/components/AuthGuard";
import { usePathname } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  /**
   * Menentukan judul halaman secara dinamis berdasarkan path
   * Biar Admin tahu mereka lagi di ruangan mana, Bre!
   */
  const getHeaderTitle = (path: string) => {
    switch (true) {
      case path.startsWith("/activities"):
        return "Monitoring Aktivitas";
      case path.startsWith("/attendance"):
        return "Presensi & Kedisiplinan";
      case path.startsWith("/reports"):
        return "Laporan Pengaduan";
      case path.startsWith("/users"):
        return "Manajemen Karyawan";
      case path.startsWith("/locations"):
        return "Konfigurasi Lokasi";
      default:
        return "Dashboard Utama";
    }
  };

  return (
    <AuthGuard>
      <MainLayout>
        <main className="flex flex-col gap-6 animate-in fade-in duration-500">
          {/* Breadcrumb Sederhana (Opsional) */}
          <nav className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
            Sistem Mapan Rajasa / {getHeaderTitle(pathname)}
          </nav>

          {/* Konten Halaman Utama */}
          {children}
        </main>
      </MainLayout>
    </AuthGuard>
  );
}
