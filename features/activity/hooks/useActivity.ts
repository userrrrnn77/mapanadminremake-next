import { useCallback, useState } from "react";
import { useActivityStore } from "../store";
import { createActivityReq, myActivityReq, getAllActivityReq } from "../api";
import { CreateActivityBody } from "../types";

export const useActivity = () => {
  const {
    activities,
    myActivities,
    setActivities,
    setMyActivities,
    isLoading: storeLoading,
    setLoading,
  } = useActivityStore();

  const [localLoading, setLocalLoading] = useState(false);

  // 1. Ambil Semua Aktivitas (Admin View)
  const fetchAllActivities = useCallback(async () => {
    setLoading(true);

    try {
      const res = await getAllActivityReq();
      setActivities(res.data.data);
    } catch (error) {
      console.error("Gagal tarik semua aktivitas, bgsd!", error);
    } finally {
      setLoading(false);
    }
  }, [setActivities, setLoading]);

  // 2. Ambil Aktivitas Saya
  const fetchMyActivities = useCallback(async () => {
    setLoading(true);

    try {
      const res = await myActivityReq();
      setMyActivities(res.data.data);
    } catch (error) {
      console.error("Gagal tarik aktivitas lu, Bre!", error);
    } finally {
      setLoading(false);
    }
  }, [setMyActivities, setLoading]);

  // 3. Create Aktivitas Baru
  const createActivity = async (data: CreateActivityBody) => {
    setLocalLoading(true);
    try {
      const res = await createActivityReq(data);
      // Refresh data setelah sukses
      fetchMyActivities();
      return { success: true, data: res.data };
    } catch (error) {
      console.error("Gagal lapor kegiatan, taik!", error);
      return { success: false, error };
    } finally {
      setLocalLoading(false);
    }
  };

  return {
    activities,
    myActivities,
    isLoading: storeLoading || localLoading,
    fetchAllActivities,
    fetchMyActivities,
    createActivity,
  };
};
