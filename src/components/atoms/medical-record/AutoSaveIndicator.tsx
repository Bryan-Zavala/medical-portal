"use client";

import { useMedicalRecordForm } from "@/contexts/MedicalRecordFormContext";

export function AutoSaveIndicator() {
  const { lastSaved, savingError } = useMedicalRecordForm();

  return (
    <div>
      {lastSaved && (
        <p className="text-xs text-slate-500">Último guardado: {lastSaved}</p>
      )}

      {savingError && <p className="text-xs text-red-600">{savingError}</p>}
    </div>
  );
}
