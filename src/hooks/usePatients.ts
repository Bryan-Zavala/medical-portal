"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchPatients } from "@/services/patient.service";
import type { PatientFilters } from "@/lib/validations/patient.schema";

export function usePatients(filters: PatientFilters) {
  const queryClient = useQueryClient();

  // 1. Query principal: Obtiene los datos de la página actual de forma estricta
  const query = useQuery({
    queryKey: ["patients", filters],
    queryFn: () => fetchPatients(filters),
  });

  // 2. Patrón Oficial de Prefetching: Anticiparse al usuario
  useEffect(() => {
    // Solo precargamos si hay datos y si NO estamos en la última página
    if (
      query.data?.metadata.totalPages &&
      filters.page < query.data.metadata.totalPages
    ) {
      const nextFilters = { ...filters, page: filters.page + 1 };

      // Descarga la siguiente página en segundo plano y la guarda en caché
      queryClient.prefetchQuery({
        queryKey: ["patients", nextFilters],
        queryFn: () => fetchPatients(nextFilters),
      });
    }
  }, [filters, query.data?.metadata.totalPages, queryClient]);

  return query;
}
