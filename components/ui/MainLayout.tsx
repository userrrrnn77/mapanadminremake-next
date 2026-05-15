"use client";

import React, { useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Container } from "./Container";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex">
      {/* Sidebar - Sekarang sudah terpisah */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        logout={logout}
      />

      <div className="flex-1 lg:pl-64 flex flex-col">
        {/* Navbar - Sekarang sudah terpisah */}
        <Navbar
          user={user}
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="p-4 md:p-8 flex-1">
          <Container>{children}</Container>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm animate-in fade-in duration-300"
        />
      )}
    </div>
  );
};
