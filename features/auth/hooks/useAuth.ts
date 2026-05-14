import { useAuthStore } from "../store";
import { loginReq } from "../api";
import { LoginBody } from "../types";
import { AxiosError } from "axios";

export const useAuth = () => {
  const { user, token, isAuthenticated, setAuth, logout } = useAuthStore();

  const isAdmin = user?.role === "admin";
  const profilePhoto = user?.profilePhoto?.url || "/default-avatar.png";
  const fullname = user?.fullname || "Admin Mapan";

  const login = async (data: LoginBody) => {
    try {
      const res = await loginReq(data);

      // Ambil data dari response (sesuaikan dengan struktur API-mu)
      const userData = res.data?.user || res.user;
      const userToken = res.data?.token || res.token;

      setAuth(userData, userToken);
      return { success: true };
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return {
        success: false,
        error: error.response?.data?.message || "Nomor HP atau Password salah!",
      };
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    profilePhoto,
    fullname,
    login,
    logout,
  };
};
