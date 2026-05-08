export type Role = "doctor" | "patient" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
};