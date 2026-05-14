import { useState } from "react";
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

  // 1. Ambil Semua Kuli (Admin View)
  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/user");
      // Kita langsung set datanya sesuai interface IUser lu bre
      setUsers(res.data.data || res.data);
    } catch (err) {
      console.error("Gagal ambil daftar kuli, bgsd!", err);
    } finally {
      setLoading(false);
    }
  };

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

  return {
    users,
    selectedUser,
    isLoading: storeLoading || isActionLoading,
    fetchAllUsers,
    createNewUser,
    assignUser,
    setSelectedUser,
  };
};
