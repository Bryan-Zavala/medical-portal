// COMPLEJIDAD PREVENTIVA: Usamos 'unknown' para obligarnos a verificar el tipo en tiempo de ejecución
export function sanitizeText(value: unknown): string {
  // 1. Defensa contra null, undefined, números u objetos
  if (typeof value !== "string") return "";

  return (
    value
      .trim()
      // 2. Limpieza de caracteres de control invisibles (ASCII 0-31) que corrompen JSON
      // Muy común al copiar y pegar desde historiales médicos antiguos (ej. Word o PDFs)
      .replace(/[\x00-\x1F\x7F]/g, "")
      // 3. Reducir múltiples espacios, tabulaciones o saltos de línea a uno solo
      .replace(/\s+/g, " ")
  );

  /* NOTA SENIOR: Hemos eliminado el replace(/<[^>]*>?/gm, ""). 
    React escapa el HTML automáticamente, previniendo XSS por defecto.
    Si alguna vez necesitas guardar HTML rico y limpiarlo para la base de datos, 
    NUNCA uses Regex. Usa una librería oficial como 'isomorphic-dompurify'.
  */
}

export function sanitizeSearchQuery(value: unknown): string {
  const sanitized = sanitizeText(value);
  // Un buscador no necesita más de 100 caracteres. Protege contra ataques de denegación de servicio (DoS) en la base de datos.
  return sanitized.length > 100 ? sanitized.slice(0, 100) : sanitized;
}

export function sanitizePatientName(value: unknown): string {
  const sanitized = sanitizeText(value);
  return sanitized.length > 80 ? sanitized.slice(0, 80) : sanitized;
}

export function sanitizeMedicalNote(value: unknown): string {
  const sanitized = sanitizeText(value);

  // COMPLEJIDAD PREVENTIVA (Riesgo Clínico):
  // Si cortamos una nota, debemos avisar visualmente que el texto continúa.
  if (sanitized.length > 1000) {
    // Cortamos en 997 y añadimos 3 puntos para mantener el límite exacto de 1000
    return sanitized.slice(0, 997) + "...";
  }

  return sanitized;
}
