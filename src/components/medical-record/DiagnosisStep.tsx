// src/components/medical-record/DiagnosisStep.tsx

"use client";

import { useMedicalRecordForm } from "@/contexts/MedicalRecordFormContext";

export function DiagnosisStep() {
  const { draft, updateDraft, currentStep } = useMedicalRecordForm();

  if (currentStep !== 1) return null;

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Ingresa el diagnóstico
        </label>
        <input
          type="text"
          value={draft.diagnosis}
          onChange={(e) => updateDraft({ diagnosis: e.target.value })}
          placeholder="Ej: Hipertensión arterial"
          maxLength={200}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
        />
        <p className="mt-1 text-xs text-slate-500">
          {draft.diagnosis.length}/200 caracteres
        </p>
      </div>
    </div>
  );
}
