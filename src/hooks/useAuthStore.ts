import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserWithoutPassword = {
  email: string;
  firstname: string;
  id: number;
  lastname: string;
  school: string;
  is_first_visit: boolean;
};

type AuthStore = {
  user: UserWithoutPassword | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (user?: UserWithoutPassword, accessToken?: string) => void;
  logout: () => void;
  setUser: (user: UserWithoutPassword) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      login: (user?: UserWithoutPassword, accessToken?: string) =>
        set({
          user,
          accessToken,
          isAuthenticated: true,
        }),
      logout: () => {
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        });
      },
      setUser: (user) => set({ user }),
    }),
    {
      name: "auth-storage", // name in localStorage
    }
  )
);
