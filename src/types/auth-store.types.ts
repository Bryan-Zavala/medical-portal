import type { User } from "./user.types";

export interface AuthState {
  user: User | null;
  users: User[];
  _hasHydrated: boolean;

  login: (email: string) => User | null;
  logout: () => void;
  setUser: (user: User | null) => void;
  setHasHydrated: (state: boolean) => void;
}
