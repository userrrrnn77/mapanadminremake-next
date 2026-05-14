// app/providers.tsx
"use client";

import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Toaster position="top-right" richColors closeButton theme="system" />
      <HelmetProvider>{children}</HelmetProvider>
    </ThemeProvider>
  );
}
