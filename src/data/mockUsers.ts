import type { User } from "@/types/user.types";

export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Dra. Ana López",
    email: "ana.doctor@clinic.com",
    role: "doctor",
  },
  {
    id: "user-2",
    name: "Carlos Pérez",
    email: "carlos.patient@mail.com",
    role: "patient",
  },
  {
    id: "user-3",
    name: "Marta Ruiz",
    email: "marta.patient@mail.com",
    role: "patient",
  },
];