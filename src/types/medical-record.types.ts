export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  diagnosis: string;
  notes: string;
  prescriptions: string[];
  createdAt: string;
};