// src/components/dashboard/DoctorPatientsRecords.tsx

"use client";

import { useState } from "react";
import type { MedicalRecord } from "@/types/medical-record.types";
import type { User } from "@/types/user.types";
import { SearchBar } from "@/components/molecules/SearchBar";
import { mockDoctors } from "@/data/mockDoctors";
import { mockPatients } from "@/data/mockPatients";
import { useMedicalRecordStore } from "@/store/useMedicalRecordStore";

interface DoctorPatientsRecordsProps {
  user: User;
}

type RecordForm = {
  diagnosis: string;
  notes: string;
  prescriptions: string;
};

const emptyForm: RecordForm = {
  diagnosis: "",
  notes: "",
  prescriptions: "",
};

export function DoctorPatientsRecords({ user }: DoctorPatientsRecordsProps) {
  const records = useMedicalRecordStore((state) => state.records);
  const createRecord = useMedicalRecordStore((state) => state.createRecord);
  const updateRecord = useMedicalRecordStore((state) => state.updateRecord);

  const doctor = mockDoctors.find((doctor) => doctor.userId === user.id);
  const [query, setQuery] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState<string>("");
  const [editingRecordId, setEditingRecordId] = useState<string | null>(null);
  const [form, setForm] = useState<RecordForm>(emptyForm);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  if (!doctor) return null;

  const visiblePatients = mockPatients.filter((patient) =>
    patient.name.toLowerCase().includes(query.toLowerCase()),
  );

  const selectedPatient = mockPatients.find(
    (patient) => patient.id === selectedPatientId,
  );
  const selectedRecords = records.filter(
    (record) => record.patientId === selectedPatientId,
  );

  const resetForm = () => {
    setForm(emptyForm);
    setEditingRecordId(null);
  };

  const submitRecord = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedPatient || !form.diagnosis.trim() || !form.notes.trim())
      return;

    const data = {
      diagnosis: form.diagnosis.trim(),
      notes: form.notes.trim(),
      prescriptions: form.prescriptions
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    if (editingRecordId) {
      updateRecord(editingRecordId, data);
    } else {
      const newRecord: MedicalRecord = {
        id: crypto.randomUUID(),
        patientId: selectedPatient.id,
        doctorId: doctor.id,
        createdAt: new Date().toISOString(),
        ...data,
      };

      createRecord(newRecord);
    }

    resetForm();
  };

  const startEdit = (record: MedicalRecord) => {
    setEditingRecordId(record.id);
    setForm({
      diagnosis: record.diagnosis,
      notes: record.notes,
      prescriptions: record.prescriptions.join(", "),
    });
  };

  // const patient = mockPatients.find(
  //   (patient) => patient.id === selectedPatientId,
  // );

  // setToastMessage(`Expediente enviado a ${patient?.name ?? "paciente"}`);

  // setTimeout(() => {
  //   setToastMessage(null);
  // }, 3000);

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {toastMessage && (
        <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-4 font-semibold text-emerald-800 shadow-lg">
          {toastMessage}
        </div>
      )}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Pacientes - Ver expedientes
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Busca pacientes por nombre, consulta expedientes y crea nuevos
            informes acumulables.
          </p>
        </div>
        <div className="w-full sm:max-w-sm">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Buscar paciente por nombre"
          />
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="space-y-3">
          {visiblePatients.length === 0 && (
            <p className="rounded-xl border border-slate-200 p-4 text-sm text-slate-600">
              No hay pacientes atendidos que coincidan.
            </p>
          )}

          {visiblePatients.map((patient) => (
            <button
              key={patient.id}
              type="button"
              onClick={() => {
                setSelectedPatientId(patient.id);
                resetForm();
              }}
              className={`w-full rounded-xl border p-4 text-left transition ${
                selectedPatientId === patient.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              <p className="font-semibold text-slate-900">{patient.name}</p>
              <p className="text-sm text-slate-600">
                {patient.age} años · {patient.phone}
              </p>
              <p className="mt-1 text-xs font-semibold text-slate-500">
                {
                  records.filter((record) => record.patientId === patient.id)
                    .length
                }{" "}
                expedientes
              </p>
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 p-5">
          {!selectedPatient && (
            <p className="text-sm text-slate-600">
              Selecciona un paciente para ver o crear expedientes.
            </p>
          )}

          {selectedPatient && (
            <>
              <h3 className="text-xl font-bold text-slate-900">
                {selectedPatient.name}
              </h3>

              <form
                onSubmit={submitRecord}
                className="mt-5 grid gap-3 rounded-xl bg-slate-50 p-4"
              >
                <h4 className="font-semibold text-slate-900">
                  {editingRecordId
                    ? "Modificar expediente"
                    : "Crear expediente"}
                </h4>
                <input
                  value={form.diagnosis}
                  onChange={(event) =>
                    setForm((state) => ({
                      ...state,
                      diagnosis: event.target.value,
                    }))
                  }
                  placeholder="Diagnóstico"
                  className="rounded-xl border border-slate-300 px-4 py-3"
                />
                <textarea
                  value={form.notes}
                  onChange={(event) =>
                    setForm((state) => ({
                      ...state,
                      notes: event.target.value,
                    }))
                  }
                  placeholder="Informe / notas médicas"
                  className="min-h-24 rounded-xl border border-slate-300 px-4 py-3"
                />
                <input
                  value={form.prescriptions}
                  onChange={(event) =>
                    setForm((state) => ({
                      ...state,
                      prescriptions: event.target.value,
                    }))
                  }
                  placeholder="Prescripciones separadas por coma"
                  className="rounded-xl border border-slate-300 px-4 py-3"
                />
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
                  >
                    {editingRecordId ? "Guardar cambios" : "Crear expediente"}
                  </button>
                  {editingRecordId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
                    >
                      Cancelar edición
                    </button>
                  )}
                </div>
              </form>

              <div className="mt-5 space-y-4">
                {selectedRecords.length === 0 && (
                  <p className="text-sm text-slate-600">
                    Este paciente aún no tiene expedientes.
                  </p>
                )}

                {selectedRecords.map((record) => (
                  <article
                    key={record.id}
                    className="rounded-xl border border-slate-200 p-4"
                  >
                    <p className="text-xs font-semibold text-slate-500">
                      {new Date(record.createdAt).toLocaleString()}
                    </p>
                    <h4 className="mt-2 font-bold text-slate-900">
                      {record.diagnosis}
                    </h4>
                    <p className="mt-2 text-sm text-slate-700">
                      {record.notes}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      <span className="font-semibold">Prescripción:</span>{" "}
                      {record.prescriptions.join(", ") || "Sin prescripción"}
                    </p>
                    <button
                      type="button"
                      onClick={() => startEdit(record)}
                      className="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                    >
                      Modificar
                    </button>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
