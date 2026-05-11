import { z } from "zod";

// 1. Esquema base del paciente (Alineado con patient.types.ts)
export const patientSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string().min(2, "El nombre es muy corto"),
  age: z.number().positive(),
  phone: z.string(),
});

// 2. Esquema para la respuesta paginada del servidor
export const paginatedPatientsSchema = z.object({
  data: z.array(patientSchema),
  metadata: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});

// 3. Tipos inferidos automáticamente por Zod
export type PatientResponse = z.infer<typeof patientSchema>;
export type PaginatedPatients = z.infer<typeof paginatedPatientsSchema>;

// 4. Esquema para los filtros de búsqueda
export interface PatientFilters {
  search?: string;
  minAge?: number;
  maxAge?: number;
  page: number;
  limit: number;
}
