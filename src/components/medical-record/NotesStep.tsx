// src/components/medical-record/NotesStep.tsx

"use client";

import { useMedicalRecordForm } from "@/contexts/MedicalRecordFormContext";

export function NotesStep() {
  const { draft, updateDraft, currentStep } = useMedicalRecordForm();

  if (currentStep !== 2) return null;

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Agrega observaciones clínicas
        </label>
        <textarea
          value={draft.notes}
          onChange={(e) => updateDraft({ notes: e.target.value })}
          placeholder="Ej: Paciente presenta síntomas de..."
          maxLength={2000}
          rows={6}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
        />
        <p className="mt-1 text-xs text-slate-500">
          {draft.notes.length}/2000 caracteres
        </p>
      </div>
    </div>
  );
}
