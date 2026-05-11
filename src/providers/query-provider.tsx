"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  // Inicializamos el cliente una sola vez por sesión de usuario
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutos antes de volver a pedir datos
            refetchOnWindowFocus: false, // Evita peticiones innecesarias al cambiar de pestaña
            retry: 2, // Reintenta 2 veces si la API falla
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
