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
  {
    id: "user-3",
    name: "Javier Martín",
    email: "javier.doctor@clinic.com",
    password: "Doctor123!",
    role: "doctor",
  },
  {
    id: "user-4",
    name: "Lucía Torres",
    email: "lucia.doctor@clinic.com",
    password: "Doctor123!",
    role: "doctor",
  },
  {
    id: "user-5",
    name: "Marta Ruiz",
    email: "marta.patient@mail.com",
    password: "Paciente123!",
    role: "patient",
  },
  {
    id: "user-6",
    name: "Sergio Gómez",
    email: "sergio.patient@mail.com",
    password: "Paciente123!",
    role: "patient",
  },
  {
    id: "user-7",
    name: "Elena Navarro",
    email: "elena.patient@mail.com",
    password: "Paciente123!",
    role: "patient",
  },
];