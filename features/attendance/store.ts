// features/attendance/store.ts

import { create } from "zustand";
import { IAttendanceFE } from "./types";

interface AttendanceState {
  attendances: IAttendanceFE[];
  myAttendances: IAttendanceFE[];
  isLoading: boolean;
  setAttendances: (data: IAttendanceFE[]) => void;
  setMyAttendances: (data: IAttendanceFE[]) => void;
  setLoading: (val: boolean) => void;
}

export const useAttendanceStore = create<AttendanceState>((set) => ({
  attendances: [],
  myAttendances: [],
  isLoading: false,
  setAttendances: (data) => set({ attendances: data }),
  setMyAttendances: (data) => set({ myAttendances: data }),
  setLoading: (val) => set({ isLoading: val }),
}));