// services/api.ts
import axios from "axios";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/store";

const api = axios.create({
  baseURL: "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// 1. Request Interceptor: Pasang Token Otomatis (Versi Web)
api.interceptors.request.use(
  (config) => {
    // Di web, kita pake localStorage (karena SecureStore itu punya mobile)
    if (typeof window !== "undefined") {
      const token = useAuthStore.getState().token;
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 2. Response Interceptor: Satpam Token (Versi Web)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || "";

    if (status === 401 || status === 403) {
      const isLogicError =
        message.toLowerCase().includes("lokasi") ||
        message.toLowerCase().includes("radius") ||
        message.toLowerCase().includes("jarak") ||
        message.toLowerCase().includes("absensi");

      if (!isLogicError) {
        toast.error("Sesi Berakhir: Login ulang bre.");

        useAuthStore.getState().logout();
      }
    }

    return Promise.reject(error);
  },
);

export default api;
