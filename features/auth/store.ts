import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IUser } from "./types";

interface AuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: IUser, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("userToken", token);
        }
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("userToken");
          set({ user: null, token: null, isAuthenticated: false });
          window.location.href = "/login";
        }
      },
    }),
    {
      name: "mapan-auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
