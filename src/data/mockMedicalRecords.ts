import type { MedicalRecord } from "@/types/medical-record.types";

export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: "record-1",
    patientId: "patient-1",
    doctorId: "doctor-1",
    diagnosis: "Hipertensión leve",
    notes: "Controlar presión arterial durante 2 semanas.",
    prescriptions: ["Enalapril 5mg"],
    createdAt: "2026-05-01T09:30:00",
  },
  {
    id: "record-2",
    patientId: "patient-2",
    doctorId: "doctor-1",
    diagnosis: "Ansiedad leve",
    notes: "Recomendada evaluación psicológica.",
    prescriptions: ["Sin medicación inicial"],
    createdAt: "2026-05-02T11:00:00",
  },
];