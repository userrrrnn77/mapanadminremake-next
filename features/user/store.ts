// features/user/store.ts

import { create } from "zustand";
import { IUser } from "./types";

interface UserState {
  users: IUser[];
  selectedUser: IUser | null;
  isLoading: boolean;
  setUsers: (data: IUser[]) => void;
  setSelectedUser: (user: IUser | null) => void;
  setLoading: (val: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  selectedUser: null,
  isLoading: false,
  setUsers: (data) => set({ users: data }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setLoading: (val) => set({ isLoading: val }),
}));
