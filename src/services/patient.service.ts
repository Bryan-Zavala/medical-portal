import { mockPatients } from "@/data/mockPatients";
import {
  paginatedPatientsSchema,
  type PatientFilters,
  type PaginatedPatients,
} from "@/lib/validations/patient.schema";

// Simulador de latencia de red (500ms)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchPatients(
  filters: PatientFilters,
): Promise<PaginatedPatients> {
  await delay(500);

  let filteredData = [...mockPatients];

  // 1. Aplicar filtro de búsqueda (por nombre o teléfono)
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredData = filteredData.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.phone.includes(searchTerm),
    );
  }

  // 2. Aplicar filtros de edad
  if (filters.minAge !== undefined) {
    filteredData = filteredData.filter((p) => p.age >= filters.minAge!);
  }
  if (filters.maxAge !== undefined) {
    filteredData = filteredData.filter((p) => p.age <= filters.maxAge!);
  }

  // 3. Calcular paginación
  const total = filteredData.length;
  const totalPages = Math.ceil(total / filters.limit);
  const startIndex = (filters.page - 1) * filters.limit;
  const endIndex = startIndex + filters.limit;

  const paginatedData = filteredData.slice(startIndex, endIndex);

  // 4. Construir respuesta
  const rawResponse = {
    data: paginatedData,
    metadata: {
      total,
      page: filters.page,
      limit: filters.limit,
      totalPages,
    },
  };

  // 5. VALIDACIÓN  CON ZOD
  return paginatedPatientsSchema.parse(rawResponse);
}
