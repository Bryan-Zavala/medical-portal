// src/data/mockUsers.ts

import type { User } from "../types/user.types";

export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Ana López",
    email: "doctor@clinic.com",
    password: "Doctor123!",
    role: "doctor",
  },
  {
    id: "user-2",
    name: "Carlos Pérez",
    email: "paciente@mail.com",
    password: "Paciente123!",
    role: "patient",
  },
];