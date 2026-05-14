import { create } from "zustand";
import { IActivity } from "./types";

interface ActivityState {
  activities: IActivity[];
  myActivities: IActivity[];
  isLoading: boolean;
  setActivities: (data: IActivity[]) => void;
  setMyActivities: (data: IActivity[]) => void;
  setLoading: (val: boolean) => void;
  resetActivities: () => void;
}

export const useActivityStore = create<ActivityState>((set) => ({
  activities: [],
  myActivities: [],
  isLoading: false,
  setActivities: (data) => set({ activities: data }),
  setMyActivities: (data) => set({ myActivities: data }),
  setLoading: (val) => set({ isLoading: val }),
  resetActivities: () =>
    set({ activities: [], myActivities: [], isLoading: false }),
}));
