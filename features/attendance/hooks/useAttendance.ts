"use client";

import { useState, useCallback } from "react";
import { useAttendanceStore } from "../store";
import api from "@/services/_axios";

export const useAttendance = () => {
  const {
    myAttendances,
    setMyAttendances,
    isLoading: storeLoading,
    setLoading,
  } = useAttendanceStore();

  const [isActionLoading, setIsActionLoading] = useState(false);

  /**
   * Mengambil semua data absensi karyawan (Khusus Tampilan Admin)
   * Menggunakan useCallback untuk menjaga stabilitas dependensi di useEffect
   */
  const fetchAllAttendances = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/attendance");
      // Mengatur data ke store pusat
      const data = res.data.data || res.data;
      setMyAttendances(Array.isArray(data) ? data : []);
      setIsActionLoading(false)
    } catch (error) {
      console.error("Gagal mengambil data absensi sistem:", error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setMyAttendances]);

  /**
   * Kalkulasi statistik kehadiran secara real-time dari state
   */
  const stats = {
    totalTelat: myAttendances.filter((a) => a.status === "terlambat").length,
    totalTepatWaktu: myAttendances.filter((a) => a.status === "tepat_waktu")
      .length,
    totalPenalty: myAttendances.reduce(
      (acc, curr) => acc + (curr.penalty || 0),
      0,
    ),
    totalLembur: myAttendances.filter((a) => a.status === "lembur").length,
  };

  return {
    attendance: myAttendances, // Konsisten menggunakan nama 'attendance' untuk UI
    isLoading: storeLoading || isActionLoading,
    fetchAllAttendances,
    stats,
  };
};
