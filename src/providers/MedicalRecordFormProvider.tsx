// src/providers/MedicalRecordFormProvider.tsx

"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { User } from "@/types/user.types";
import type { MedicalRecord } from "@/types/medical-record.types";
import {
  medicalRecordDraftSchema,
  createMedicalRecordSchema,
} from "@/lib/validations/medical-record.schema";
import type { MedicalRecordDraft } from "@/types/medical-record.types";
import { mockDoctors } from "@/data/mockDoctors";
import { mockPatients } from "@/data/mockPatients";
import { useMedicalRecordStore } from "@/store/useMedicalRecordStore";
import { MedicalRecordFormContext } from "@/contexts/MedicalRecordFormContext";
import type { MedicalRecordFormContextType } from "@/types/medical-record.types";

interface MedicalRecordFormProviderProps {
  children: ReactNode;
  user: User;
  selectedPatientId: string;
}

const EMPTY_DRAFT: MedicalRecordDraft = {
  patientId: "",
  doctorId: "",
  diagnosis: "",
  notes: "",
  prescriptions: [],
};

export function MedicalRecordFormProvider({
  children,
  user,
  selectedPatientId,
}: MedicalRecordFormProviderProps) {
  const createRecord = useMedicalRecordStore((state) => state.createRecord);
  const updateRecord = useMedicalRecordStore((state) => state.updateRecord);

  const doctor = mockDoctors.find((d) => d.userId === user.id) || null;
  const patient = mockPatients.find((p) => p.id === selectedPatientId) || null;

  const [currentStep, setCurrentStep] = useState(1);
  const [draft, setDraft] = useState<MedicalRecordDraft>(EMPTY_DRAFT);
  const [lastSaved, setLastSaved] = useState<string>("");
  const [savingError, setSavingError] = useState<string>("");
  const [editingRecordId, setEditingRecordId] = useState<string | null>(null);

  // Listen for edit record event
  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<MedicalRecord>;
      const record = customEvent.detail;
      if (record) {
        setEditingRecordId(record.id);
        setDraft({
          patientId: record.patientId,
          doctorId: record.doctorId,
          diagnosis: record.diagnosis,
          notes: record.notes,
          prescriptions: record.prescriptions,
        });
        setCurrentStep(1);
        setSavingError("");
      }
    };

    window.addEventListener("medical-record:load-for-edit", handler);
    return () =>
      window.removeEventListener("medical-record:load-for-edit", handler);
  }, []);

  // Auto-save con debounce
  useEffect(() => {
    if (!doctor || !patient) return;

    const timer = setTimeout(() => {
      try {
        medicalRecordDraftSchema.parse({
          ...draft,
          patientId: patient.id,
          doctorId: doctor.id,
        });

        localStorage.setItem(
          `medicalRecordDraft_${patient.id}`,
          JSON.stringify(draft),
        );

        setLastSaved(new Date().toLocaleTimeString());
        setSavingError("");
      } catch (error) {
        // Silenciosamente ignorar errores de validación parcial
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [draft, doctor, patient]);

  const updateDraft = (updates: Partial<MedicalRecordDraft>) => {
    setDraft((prev) => ({ ...prev, ...updates }));
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1:
        return draft.diagnosis.trim().length >= 3;
      case 2:
        return draft.notes.trim().length >= 10;
      case 3:
        return draft.prescriptions.some((p) => p.trim().length > 0);
      default:
        return false;
    }
  };

  const submit = async () => {
    if (!doctor || !patient) return;

    try {
      const payload = createMedicalRecordSchema.parse({
        patientId: patient.id,
        doctorId: doctor.id,
        diagnosis: draft.diagnosis,
        notes: draft.notes,
        prescriptions: draft.prescriptions.filter((p) => p.trim().length > 0),
      });

      if (editingRecordId) {
        updateRecord(editingRecordId, payload);
      } else {
        createRecord({
          id: crypto.randomUUID(),
          ...payload,
          createdAt: new Date().toISOString(),
        });
      }

      setDraft(EMPTY_DRAFT);
      setEditingRecordId(null);
      localStorage.removeItem(`medicalRecordDraft_${patient.id}`);
      setCurrentStep(1);
      window.dispatchEvent(new Event("medical-record:reset"));
    } catch (error) {
      setSavingError(
        "Error al validar el formulario. Verifica todos los campos.",
      );
    }
  };

  const reset = () => {
    setDraft(EMPTY_DRAFT);
    setCurrentStep(1);
    setSavingError("");
    setEditingRecordId(null);
  };

  const loadRecordForEdit = (record: MedicalRecord) => {
    setEditingRecordId(record.id);
    setDraft({
      patientId: record.patientId,
      doctorId: record.doctorId,
      diagnosis: record.diagnosis,
      notes: record.notes,
      prescriptions: record.prescriptions,
    });
    setCurrentStep(1);
    setSavingError("");
  };

  const cancelEdit = () => {
    reset();
    window.dispatchEvent(new Event("medical-record:reset"));
  };

  const value: MedicalRecordFormContextType = {
    user,
    doctor,
    patient,
    draft,
    currentStep,
    lastSaved,
    savingError,
    editingRecordId,
    setCurrentStep,
    updateDraft,
    canProceed,
    submit,
    reset,
    loadRecordForEdit,
    cancelEdit,
  };

  return (
    <MedicalRecordFormContext.Provider value={value}>
      {children}
    </MedicalRecordFormContext.Provider>
  );
}
