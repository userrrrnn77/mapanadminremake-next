"use client";

import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !password) {
      return toast.error("Nomor HP dan Password wajib diisi!");
    }

    setIsLoading(true);
    try {
      const res = await login({ phone, password });
      if (res.success) {
        toast.success("Login Berhasil! Selamat datang.");
        router.replace("/");
      } else {
        toast.error(res.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan pada server!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-5">
      <Input
        label="Nomor WhatsApp"
        placeholder="0812xxxxxxxx"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        disabled={isLoading}
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />
      <Button type="submit" className="w-full h-12" isLoading={isLoading}>
        Masuk ke Dashboard
      </Button>
    </form>
  );
};
