// components/ui/MainLayout.tsx
"use client";

import React, { useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Container } from "./Container";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  const menuItems = [
    { name: "Dashboard", icon: "📊", href: "/" },
    { name: "Aktivitas", icon: "📸", href: "/activities" },
    { name: "Absensi", icon: "📅", href: "/attendance" },
    { name: "Karyawan", icon: "👷", href: "/users" },
    { name: "Laporan", icon: "📝", href: "/reports" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex">
      {/* SIDEBAR DESKTOP */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-zinc-950 border-r dark:border-zinc-900 transform transition-transform lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">
            MAPAN <span className="text-zinc-400">RAJASA</span>
          </h1>
        </div>
        <nav className="mt-4 px-4 space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition text-zinc-600 dark:text-zinc-400">
              <span>{item.icon}</span> {item.name}
            </a>
          ))}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition mt-10">
            <span>🚪</span> Logout
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 lg:pl-64 flex flex-col">
        {/* NAVBAR */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b dark:border-zinc-900 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 text-2xl">
            {isSidebarOpen ? "✕" : "☰"}
          </button>
          <div className="hidden lg:block text-sm font-medium text-zinc-500">
            Selamat bekerja,{" "}
            <span className="text-zinc-900 dark:text-white">
              {user?.fullname || "Admin"}
            </span>
            !
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
              {user?.fullname?.[0] || "A"}
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-4 md:p-8">
          <Container>{children}</Container>
        </main>
      </div>

      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
        />
      )}
    </div>
  );
};
