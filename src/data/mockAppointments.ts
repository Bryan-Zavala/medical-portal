import type { Appointment } from "@/types/appointment.types";

export const mockAppointments: Appointment[] = [
  {
    id: "appointment-1",
    patientId: "patient-1",
    doctorId: "doctor-1",
    date: "2026-05-10T10:00:00",
    reason: "Dolor en el pecho",
    status: "pending",
  },
  {
    id: "appointment-2",
    patientId: "patient-2",
    doctorId: "doctor-1",
    date: "2026-05-11T12:30:00",
    reason: "Revisión general",
    status: "confirmed",
  },
];