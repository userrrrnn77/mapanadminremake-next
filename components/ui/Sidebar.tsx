"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Camera,
  FileText,
  MapPin,
  LogOut,
} from "lucide-react";

import logoDark from "@/public/logopasmodedark.png";
import logoLight from "@/public/logopasmodelight.png";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  logout: () => void;
}

// Fungsi dummy subscribe buat useSyncExternalStore
const emptySubscribe = () => () => {};

export const Sidebar = ({ isOpen, onClose, logout }: SidebarProps) => {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();

  /**
   * 🔥 SOLUSI ANTI-CASACADING:
   * Kita cek status 'mounted' pake useSyncExternalStore.
   * Ini ngegantiin useState + useEffect (setMounted) biar compiler lu mingkem.
   */
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true, // Client-side value
    () => false, // Server-side/Hydration value
  );

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/" },
    { name: "Karyawan", icon: <Users size={20} />, href: "/users" },
    { name: "Absensi", icon: <CalendarCheck size={20} />, href: "/attendance" },
    { name: "Aktivitas", icon: <Camera size={20} />, href: "/activities" },
    { name: "Laporan", icon: <FileText size={20} />, href: "/reports" },
    { name: "Location", icon: <MapPin size={20} />, href: "/locations" },
  ];

  const isDark = resolvedTheme === "dark";

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-zinc-950 border-r dark:border-zinc-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
      <div className="flex flex-col h-full">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-3 group">
            {/* 🎯 Container Logo */}
            <div className="relative w-10 h-10 shrink-0">
              {isMounted ? (
                <Image
                  src={isDark ? logoDark : logoLight}
                  alt="Logo"
                  fill
                  className="object-contain"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-zinc-100 dark:bg-zinc-900 animate-pulse rounded-lg" />
              )}
            </div>

            {/* 🎯 Container Tulisan */}
            <div className="flex flex-col">
              <h1 className="text-xl font-bold leading-none tracking-tight text-blue-600 italic">
                MAPAN
              </h1>
              <span className="text-md font-medium text-zinc-400 not-italic tracking-[0.2em] -mt-0.5">
                RAJASA
              </span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-500 font-bold border border-blue-100 dark:border-blue-600/20 shadow-sm"
                    : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}>
                <span
                  className={
                    isActive
                      ? "text-blue-600"
                      : "text-zinc-400 group-hover:text-zinc-900"
                  }>
                  {item.icon}
                </span>
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t dark:border-zinc-900 bg-white dark:bg-zinc-950">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all font-medium group">
            <LogOut
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
            <span className="text-sm">Keluar Sesi</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
