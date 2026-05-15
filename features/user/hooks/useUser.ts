import { useCallback, useState } from "react";
import { useUserStore } from "../store";
import api from "@/services/_axios";
import { createUser, userAssignment } from "../types";
import { AxiosError } from "axios";

export const useUser = () => {
  const {
    users,
    setUsers,
    selectedUser,
    setSelectedUser,
    isLoading: storeLoading,
    setLoading,
  } = useUserStore();

  const [isActionLoading, setIsActionLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);

  // 1. Ambil Semua Kuli (Admin View)
  const fetchAllUsers = useCallback(async () => {
    setLoading(true);

    try {
      const res = await api.get("/user");
      setUsers(res.data.data || res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setUsers]);

  // 2. Create User (Pake interface createUser lu bre)
  const createNewUser = async (body: createUser) => {
    setIsActionLoading(true);
    try {
      const res = await api.post("/user", body);
      await fetchAllUsers(); // Refresh list kuli
      return { success: true, data: res.data };
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return {
        success: false,
        error: error.response?.data?.message || "Gagal bikin user baru, taik!",
      };
    } finally {
      setIsActionLoading(false);
    }
  };

  // 3. Update / Assignment (Pake interface userAssignment lu bre)
  const assignUser = async (userId: string, body: userAssignment) => {
    setIsActionLoading(true);
    try {
      const res = await api.patch(`/user/${userId}`, body);
      await fetchAllUsers();
      return { success: true, data: res.data };
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return {
        success: false,
        error: error.response?.data?.message || "Gagal assignment user, bgsd!",
      };
    } finally {
      setIsActionLoading(false);
    }
  };

  const fetchDashboardStats = useCallback(async () => {
    setIsActionLoading(true);
    try {
      const res = await api.get("/user/dashboard");
      setDashboardData(res.data.data || res.data);
      return { success: true, data: res.data.data || res.data };
    } catch (err) {
      console.error("Gagal menarik data statistik dashboard:", err);
      return { success: false, error: "Gagal memuat statistik." };
    } finally {
      setIsActionLoading(false);
    }
  }, []);

  return {
    users,
    selectedUser,
    isLoading: storeLoading || isActionLoading,
    fetchAllUsers,
    createNewUser,
    assignUser,
    setSelectedUser,
    dashboardData,
    fetchDashboardStats,
  };
};
