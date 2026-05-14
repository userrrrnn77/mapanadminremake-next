"use client";

import { LoginForm } from "@/features/auth/components/LoginForm";
import { Card } from "@/components/ui/Card";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black p-4">
      <div className="w-full max-w-100 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-blue-600">
            MAPAN <span className="text-zinc-400">RAJASA</span>
          </h1>
          <p className="text-sm text-zinc-500">
            Portal Administrasi Pusat - Kendali Elit Global
          </p>
        </div>

        <Card className="p-8 shadow-xl border-zinc-200 dark:border-zinc-800">
          <LoginForm />
        </Card>

        <p className="text-center text-[10px] text-zinc-400 uppercase tracking-widest">
          &copy; 2026 Mapan Tech Ecosystem. All rights reserved.
        </p>
      </div>
    </div>
  );
}
