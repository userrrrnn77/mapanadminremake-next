"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "../store";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();
  const pathname = usePathname();

  /**
   * 🔥 SOLUSI KASTA NINGRAT:
   * Kita tanya langsung ke mesin persist Zustand apakah sudah beres
   * baca LocalStorage atau belum, tanpa memicu 'cascading render'.
   */
  const isHydrated = useSyncExternalStore(
    (callback) => useAuthStore.persist.onFinishHydration(callback),
    () => useAuthStore.persist.hasHydrated(),
    () => false, // Saat di server (SSR), kita anggap belum hydrated
  );

  useEffect(() => {
    // Jika mesin sinkronisasi belum siap, jangan lakukan aksi redirect
    if (!isHydrated) return;

    if (!token && pathname !== "/login") {
      router.replace("/login");
    } else if (token && pathname === "/login") {
      router.replace("/");
    }
  }, [token, pathname, router, isHydrated]);

  /**
   * Tampilan Loading saat proses sinkronisasi kredensial.
   * Tidak akan menyebabkan error render karena isHydrated dikelola
   * secara native oleh useSyncExternalStore.
   */
  if (!isHydrated) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-zinc-950">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold animate-pulse">
            Sinkronisasi Matrix Mapan...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
