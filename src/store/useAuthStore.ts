"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "../types/user.types";
import { mockUsers } from "../data/mockUsers";

interface AuthState {
  user: User | null;
  users: User[]; // temporalmente
  login: (email: string) => User | null;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: mockUsers,

      login: (email) => {
        const foundUser = get().users.find((user) => user.email === email);
        if (!foundUser) return null;

        set({ user: foundUser });
        return foundUser;
      },

      logout: () => {
        set({ user: null });
      },

      setUser: (user) => {
        set({ user });
      },
    }),
    {
      name: "medical-auth-storage", // Nombre único para la clave en localStorage
      storage: createJSONStorage(() => localStorage),
      // FILTRO DE SEGURIDAD: Solo guardamos en disco el usuario actual
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
