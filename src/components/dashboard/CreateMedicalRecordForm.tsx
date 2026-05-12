// src/components/dashboard/CreateMedicalRecordForm.tsx

"use client";

import type { User } from "@/types/user.types";
import { MedicalRecordFormProvider } from "@/providers/MedicalRecordFormProvider";
import { StepIndicator } from "@/components/medical-record/StepIndicator";
import { DiagnosisStep } from "@/components/medical-record/DiagnosisStep";
import { NotesStep } from "@/components/medical-record/NotesStep";
import { PrescriptionsStep } from "@/components/medical-record/PrescriptionsStep";
import { AutoSaveIndicator } from "@/components/medical-record/AutoSaveIndicator";
import { FormActions } from "@/components/medical-record/FormActions";

interface CreateMedicalRecordFormProps {
  user: User;
  selectedPatientId: string;
}

/**
 * Container component que proporciona Context para toda la lógica del formulario
 * Compone los componentes atómicos sin prop drilling
 * Cumple: Zero Prop Drilling + Atomic Design + Zod Everywhere
 */
export function CreateMedicalRecordForm({
  user,
  selectedPatientId,
}: CreateMedicalRecordFormProps) {
  return (
    <MedicalRecordFormProvider
      user={user}
      selectedPatientId={selectedPatientId}
    >
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-xl font-bold text-slate-900">
          Crear expediente - Multi-paso
        </h3>

        {/* Indicador de pasos */}
        <div className="mt-6">
          <StepIndicator />
        </div>

        {/* Contenido del paso actual */}
        <div className="mt-6 rounded-xl bg-slate-50 p-5">
          <DiagnosisStep />
          <NotesStep />
          <PrescriptionsStep />
        </div>

        {/* Estado de auto-save */}
        <div className="mt-4">
          <AutoSaveIndicator />
        </div>

        {/* Botones de navegación */}
        <div className="mt-6">
          <FormActions />
        </div>
      </div>
    </MedicalRecordFormProvider>
  );
}
