// src/components/medical-record/PrescriptionsStep.tsx

"use client";

import { useMedicalRecordForm } from "@/contexts/MedicalRecordFormContext";

export function PrescriptionsStep() {
  const { draft, updateDraft, currentStep } = useMedicalRecordForm();

  if (currentStep !== 3) return null;

  const handlePrescriptionChange = (index: number, value: string) => {
    const updated = draft.prescriptions.map((p, i) =>
      i === index ? value : p,
    );
    updateDraft({ prescriptions: updated });
  };

  const handleRemovePrescription = (index: number) => {
    const updated = draft.prescriptions.filter((_, i) => i !== index);
    updateDraft({ prescriptions: updated });
  };

  const handleAddPrescription = () => {
    updateDraft({ prescriptions: [...draft.prescriptions, ""] });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Lista de medicamentos
        </label>
        <div className="space-y-3">
          {draft.prescriptions.length === 0 && (
            <p className="text-sm text-slate-600">
              No hay prescripciones. Agrega una para continuar.
            </p>
          )}
          {draft.prescriptions.map((prescription, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={prescription}
                onChange={(e) =>
                  handlePrescriptionChange(index, e.target.value)
                }
                placeholder={`Medicamento ${index + 1}`}
                maxLength={200}
                className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
              />
              <button
                type="button"
                onClick={() => handleRemovePrescription(index)}
                className="rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleAddPrescription}
          className="mt-3 rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
        >
          + Agregar prescripción
        </button>
      </div>
    </div>
  );
}
