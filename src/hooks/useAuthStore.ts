import { create } from "zustand";
import { persist } from "zustand/middleware";
import UserInterface from "../interfaces/user.interface";

export type UserWithoutPassword = Omit<UserInterface, "password">;

type AuthStore = {
  user: UserWithoutPassword | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (user?: UserWithoutPassword, accessToken?: string, refreshToken?: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      login: (user?: UserWithoutPassword, accessToken?: string, refreshToken?: string) =>
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
        }),
      logout: () => {
        const userId = get().user?.id;
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage", // nom dans le localStorage
    }
  )
);
