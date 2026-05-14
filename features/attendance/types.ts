export type AttendanceType = "masuk" | "keluar" | "sakit";
export type AttendanceStatus =
  | "tepat_waktu"
  | "terlambat"
  | "lembur"
  | "sakit"
  | "izin";
export type ShiftType = "pagi" | "siang" | "malam";

export interface IUserMin {
  _id: string;
  name: string;
  username: string;
  photo?: {
    url: string;
  };
  role: string;
}

export interface IAttendanceFE {
  _id: string; // Di FE pake string
  user: IUserMin; // Unexpected any. Specify a different type.
  attendanceDayKey: string;
  type: AttendanceType;
  status: AttendanceStatus;
  shift?: ShiftType;
  checkIn?: string; // Date dikirim sebagai string ISO
  checkOut?: string;
  isIncomplete: boolean;
  workLocation?: string;
  locationSnapshot?: {
    name?: string;
    radiusMeter?: number;
    center?: {
      type: string;
      coordinates: [number, number];
    };
  };
  photo: {
    url: string;
    publicId: string;
  };
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  distanceFromCenter?: number;
  lateMinutes: number;
  penalty: number;
  note: string;
  isOvertime: boolean;
  isBackup: boolean;
  backupUser?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
