import api from "@/services/_axios";
import { ShiftType } from "./types";

/**
 * 🔥 TYPES & INTERFACES (FE VERSION)
 */

/**
 * 🔥 API CALLS
 */

// 1. Check-in (Bisa Normal / Backup)
export const checkInReq = async (data: {
  lat: number;
  lng: number;
  shift: ShiftType;
  photo: { url: string; publicId: string };
  note?: string;
  isOvertime?: boolean;
  backupForUserId?: string; // Opsional kalo lagi backup orang
}) => {
  // Kalo ada backupForUserId, tembak endpoint backup
  const endpoint = data.backupForUserId
    ? "/attendance/check-in/backup"
    : "/attendance/check-in";
  const response = await api.post(endpoint, data);
  return response.data;
};

// 2. Check-out
export const checkOutReq = async (data: {
  lat: number;
  lng: number;
  note?: string;
}) => {
  const response = await api.post("/attendance/check-out", data);
  return response.data;
};

// 3. Izin Sakit
export const sickAttendanceReq = async (data: {
  lat: number;
  lng: number;
  photo: { url: string; publicId: string };
  note: string;
}) => {
  const response = await api.post("/attendance/sick", data);
  return response.data;
};

// 4. Riwayat Absen Saya
export const getMyAttendanceReq = async (params?: {
  startDate: string;
  endDate: string;
}) => {
  const response = await api.get("/attendance/my-attendance", { params });
  return response.data;
};
