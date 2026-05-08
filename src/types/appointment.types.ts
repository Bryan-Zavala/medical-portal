export type AppointmentStatus = | "pending" | "confirmed" | "cancelled" | "completed";

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  reason: string;
  status: AppointmentStatus;
};