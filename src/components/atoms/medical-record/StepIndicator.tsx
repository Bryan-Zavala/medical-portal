"use client";

import { useMedicalRecordForm } from "@/contexts/MedicalRecordFormContext";

const STEPS = [
  { id: 1, title: "Diagnóstico" },
  { id: 2, title: "Notas médicas" },
  { id: 3, title: "Prescripciones" },
];

export function StepIndicator() {
  const { currentStep, setCurrentStep, canProceed } = useMedicalRecordForm();

  return (
    <div className="flex gap-3">
      {STEPS.map((step) => (
        <button
          key={step.id}
          type="button"
          onClick={() => setCurrentStep(step.id)}
          disabled={step.id > currentStep && !canProceed()}
          className={`flex flex-col items-center rounded-lg px-4 py-3 text-sm font-semibold transition ${
            currentStep === step.id
              ? "bg-blue-600 text-white"
              : step.id <= currentStep
                ? "bg-slate-200 text-slate-900 hover:bg-slate-300"
                : "bg-slate-100 text-slate-500 cursor-not-allowed"
          }`}
        >
          <span className="text-xs">Paso {step.id}</span>
          <span>{step.title}</span>
        </button>
      ))}
    </div>
  );
}
