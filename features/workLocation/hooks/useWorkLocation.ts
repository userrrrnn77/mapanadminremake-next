import { useState } from "react";
import { useWorkLocationStore } from "../store";
import api from "@/services/_axios";
import { IWorkLocation } from "../types";
import { AxiosError } from "axios";

export const useWorkLocation = () => {
  const {
    locations,
    setLocations,
    selectedLocation,
    setSelectedLocation,
    isLoading: storeLoading,
    setLoading,
  } = useWorkLocationStore();

  const [isActionLoading, setIsActionLoading] = useState(false);

  // 1. Tarik Semua Lokasi Kerja (Admin View)
  const fetchAllLocations = async () => {
    setLoading(true);
    try {
      const res = await api.get("/work-location");
      // Pakai IWorkLocationFE sesuai pondasi lu bre
      setLocations(res.data.data || res.data);
    } catch (err) {
      console.error("Gagal tarik lokasi kerja, taik!", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Tambah Lokasi Baru (Pake interface IWorkLocation lu bre)
  const createLocation = async (body: IWorkLocation) => {
    setIsActionLoading(true);
    try {
      const res = await api.post("/work-location", body);
      await fetchAllLocations(); // Refresh list biar josjis
      return { success: true, data: res.data };
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return {
        success: false,
        error: error.response?.data?.message || "Gagal simpan lokasi, bgsd!",
      };
    } finally {
      setIsActionLoading(false);
    }
  };

  // 3. Update Lokasi / Toggle Active
  const updateLocation = async (id: string, body: Partial<IWorkLocation>) => {
    setIsActionLoading(true);
    try {
      const res = await api.patch(`/work-location/${id}`, body);
      await fetchAllLocations();
      return { success: true, data: res.data };
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return {
        success: false,
        error: error.response?.data?.message || "Gagal update lokasi, taik!",
      };
    } finally {
      setIsActionLoading(false);
    }
  };

  return {
    locations,
    selectedLocation,
    isLoading: storeLoading || isActionLoading,
    fetchAllLocations,
    createLocation,
    updateLocation,
    setSelectedLocation,
  };
};
