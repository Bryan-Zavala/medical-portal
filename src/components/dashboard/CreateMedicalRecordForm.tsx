// src/components/dashboard/CreateMedicalRecordForm.tsx

"use client";

import type { User } from "@/types/user.types";
import { MedicalRecordFormProvider } from "@/providers/MedicalRecordFormProvider";
import { StepIndicator } from "@/components/atoms/medical-record/StepIndicator";
import { DiagnosisStep } from "@/components/atoms/medical-record/DiagnosisStep";
import { NotesStep } from "@/components/atoms/medical-record/NotesStep";
import { PrescriptionsStep } from "@/components/atoms/medical-record/PrescriptionsStep";
import { AutoSaveIndicator } from "@/components/atoms/medical-record/AutoSaveIndicator";
import { FormActions } from "@/components/atoms/medical-record/FormActions";

interface CreateMedicalRecordFormProps {
  user: User;
  selectedPatientId: string;
}

/**
 * Container component que proporciona Context para toda la lógica del formulario
 * Zero Prop Drilling + Atomic Design + Zod Everywhere
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
      <section
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        aria-labelledby="medical-record-form-title"
      >
        <h3
          id="medical-record-form-title"
          className="text-xl font-bold text-slate-900"
        >
          Crear expediente - Multi-paso
        </h3>

        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Completa cada paso con calma. El progreso se guarda automáticamente y
          los campos se validan antes de avanzar.
        </p>

        {/* Indicador de pasos */}
        <div className="mt-6">
          <StepIndicator />
        </div>

        {/* Contenido del paso actual */}
        <div
          className="mt-6 rounded-xl bg-slate-50 p-5"
          role="tabpanel"
          aria-live="polite"
        >
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
      </section>
    </MedicalRecordFormProvider>
  );
}
