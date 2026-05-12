// src/store/useAuthStore.ts

"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/user.types";
import { mockUsers } from "../data/mockUsers";

interface AuthState {
  user: User | null;
  users: User[];
  failedAttempts: number;
  isBlocked: boolean;
  hasHydrated: boolean;

  login: (email: string, password: string) => boolean;
  logout: () => void;
  resetBlock: () => void;
  setHasHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: mockUsers,
      failedAttempts: 0,
      isBlocked: false,
      hasHydrated: false,

      login: (email, password) => {
        if (get().isBlocked) return false;

        const foundUser = get().users.find(
          (user) => user.email === email && user.password === password,
        );

        if (!foundUser) {
          const attempts = get().failedAttempts + 1;

          set({
            failedAttempts: attempts,
            isBlocked: attempts >= 3,
          });

          return false;
        }

        set({
          user: foundUser,
          failedAttempts: 0,
          isBlocked: false,
        });

        return true;
      },

      logout: () => {
        set({ user: null });
      },

      resetBlock: () => {
        set({
          failedAttempts: 0,
          isBlocked: false,
        });
      },

      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "medsync-auth-session",
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
