"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { z } from "zod";
import type { User } from "../types/user.types";
import { mockUsers } from "../data/mockUsers";

// 1. Zod Schema para auditar la integridad de la sesión en disco
const hydratedUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  // Protegemos el RBAC: Solo aceptamos estos 3 roles exactos
  role: z.enum(["admin", "doctor", "patient"]),
});

interface AuthState {
  user: User | null;
  users: User[];
  _hasHydrated: boolean;

  login: (email: string) => User | null;
  logout: () => void;
  setUser: (user: User | null) => void;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: mockUsers,
      _hasHydrated: false, // Inicialmente no está hidratado evitamos renderizar la UI con datos falsos

      login: (email) => {
        // COMPLEJIDAD PREVENTIVA: Validación del input
        const emailValidation = z.string().email().safeParse(email);

        if (!emailValidation.success) {
          console.warn("Intento de login con formato de email inválido");
          return null;
        }

        const foundUser = get().users.find(
          (user) => user.email === emailValidation.data,
        );
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

      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      },
    }),
    {
      name: "medical-auth-storage",
      storage: createJSONStorage(() => localStorage),
      // FILTRO DE SEGURIDAD: Nunca guardar la lista de usuarios ni estados temporales en disco
      partialize: (state) => ({ user: state.user }),

      // COMPLEJIDAD PREVENTIVA: Interceptamos la hidratación
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Fallo crítico leyendo la sesión del navegador", error);
          return;
        }

        // 1. Validación contra manipulaciones en localStorage (Spoofing)
        if (state && state.user) {
          const validation = hydratedUserSchema.safeParse(state.user);
          if (!validation.success) {
            console.error(
              "Manipulación de sesión detectada en localStorage. Abortando.",
            );
            state.user = null; // Destruimos la sesión corrupta
          }
        }

        // 2. Indicamos a la UI que es seguro renderizar
        if (state) {
          state.setHasHydrated(true);
        }
      },
    },
  ),
);
