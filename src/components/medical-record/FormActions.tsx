// src/components/medical-record/FormActions.tsx

"use client";

import { useMedicalRecordForm } from "@/contexts/MedicalRecordFormContext";

const TOTAL_STEPS = 3;

export function FormActions() {
  const { currentStep, setCurrentStep, canProceed, submit } =
    useMedicalRecordForm();

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex gap-3">
      {currentStep > 1 && (
        <button
          type="button"
          onClick={handleBack}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
        >
          ← Atrás
        </button>
      )}

      {currentStep < TOTAL_STEPS ? (
        <button
          type="button"
          onClick={handleNext}
          disabled={!canProceed()}
          className="ml-auto rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-slate-400"
        >
          Siguiente →
        </button>
      ) : (
        <button
          type="button"
          onClick={submit}
          className="ml-auto rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
        >
          Crear expediente
        </button>
      )}
    </div>
  );
}
