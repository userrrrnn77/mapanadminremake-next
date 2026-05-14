// features/workLocation/store.ts

import { create } from "zustand";
import { IWorkLocationFE } from "./types";

interface WorkLocationState {
  locations: IWorkLocationFE[];
  selectedLocation: IWorkLocationFE | null;
  isLoading: boolean;
  setLocations: (data: IWorkLocationFE[]) => void;
  setSelectedLocation: (loc: IWorkLocationFE | null) => void;
  setLoading: (val: boolean) => void;
}

export const useWorkLocationStore = create<WorkLocationState>((set) => ({
  locations: [],
  selectedLocation: null,
  isLoading: false,
  setLocations: (data) => set({ locations: data }),
  setSelectedLocation: (loc) => set({ selectedLocation: loc }),
  setLoading: (val) => set({ isLoading: val }),
}));
