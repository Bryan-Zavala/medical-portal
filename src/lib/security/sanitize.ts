export function sanitizeText(value: string): string {
  return (
    value
      // Elimina espacios vacíos al inicio y final
      .trim()

      // Elimina etiquetas HTML/scripts para evitar XSS
      .replace(/<[^>]*>?/gm, "")

      // Normaliza múltiples espacios en uno solo
      .replace(/\s+/g, " ")
  );
}

// Sanitiza búsquedas, nombres de pacientes y notas médicas limitando longitud de entrada, para mantener consistencia de datos
export function sanitizeSearchQuery(value: string): string {
  return sanitizeText(value).slice(0, 100);
}
export function sanitizePatientName(value: string): string {
  return sanitizeText(value).slice(0, 80);
}
export function sanitizeMedicalNote(value: string): string {
  return sanitizeText(value).slice(0, 1000);
}
