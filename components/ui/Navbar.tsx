"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { IUser } from "@/features/auth/types";

interface NavbarProps {
  user: IUser | null;
  isSidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
}

export const Navbar = ({
  user,
  isSidebarOpen,
  setSidebarOpen,
}: NavbarProps) => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b dark:border-zinc-900 px-4 py-3 flex items-center justify-between">
      <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="lg:hidden p-2 text-zinc-600 dark:text-zinc-400">
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className="hidden lg:block text-sm font-medium text-zinc-500 italic">
        Sistem Kendali Utama /{" "}
        <span className="text-zinc-900 dark:text-white not-italic">
          {user?.fullname || "Admin"}
        </span>
      </div>

      <Link
        href="/profile"
        className={`flex items-center gap-3 p-1 pr-3 rounded-full transition-all border ${
          pathname === "/profile"
            ? "border-blue-200 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-900/30"
            : "border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:border-zinc-200 dark:hover:border-zinc-800 shadow-sm"
        }`}>
        <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
          {user?.fullname?.[0] || "A"}
        </div>
        <div className="hidden sm:block text-right leading-none">
          <p
            className={`text-[11px] font-bold ${pathname === "/profile" ? "text-blue-600" : "text-zinc-900 dark:text-white"}`}>
            {user?.fullname || "Admin"}
          </p>
          <p className="text-[9px] text-zinc-500 uppercase tracking-tighter mt-1">
            Profil Saya
          </p>
        </div>
      </Link>
    </header>
  );
};
