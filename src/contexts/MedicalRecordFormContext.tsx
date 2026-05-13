// src/contexts/MedicalRecordFormContext.tsx

"use client";

import { createContext, useContext } from "react";
import type { User } from "@/types/user.types";
import type { MedicalRecordDraft } from "@/lib/validations/medical-record.schema";

export interface MedicalRecordFormContextType {
  // Data
  user: User;
  doctor: {
    id: string;
    userId: string;
    name: string;
    specialty: string;
  } | null;
  patient: { id: string; name: string; age: number; phone: string } | null;
  draft: MedicalRecordDraft;

  // UI State
  currentStep: number;
  lastSaved: string;
  savingError: string;

  // Actions
  setCurrentStep: (step: number) => void;
  updateDraft: (updates: Partial<MedicalRecordDraft>) => void;
  canProceed: () => boolean;
  submit: () => Promise<void>;
  reset: () => void;
}

const MedicalRecordFormContext = createContext<
  MedicalRecordFormContextType | undefined
>(undefined);

export function useMedicalRecordForm() {
  const context = useContext(MedicalRecordFormContext);
  if (!context) {
    throw new Error(
      "useMedicalRecordForm debe usarse dentro de MedicalRecordFormProvider",
    );
  }
  return context;
}

export { MedicalRecordFormContext };
