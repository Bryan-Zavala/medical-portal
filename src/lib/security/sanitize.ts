export function sanitizeText(value: string): string {
  return value
    .trim()
    .replace(/<[^>]*>?/gm, "")
    .replace(/\s+/g, " ");
}

export function sanitizeSearchQuery(value: string): string {
  return sanitizeText(value).slice(0, 100);
}

export function sanitizePatientName(value: string): string {
  return sanitizeText(value).slice(0, 80);
}

export function sanitizeMedicalNote(value: string): string {
  return sanitizeText(value).slice(0, 1000);
}
