import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 🔥 React Compiler buat performa kelas dewa */
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**", // Buka jalurnya biar semua image Cloudinary tembus, Bre!
      },
    ],
  },

  // Kalau nanti lu mau pake fitur redirect di middleware, tambahin ini:
  // skipTrailingSlashRedirect: true,
};

export default nextConfig;
