// src/components/dashboard/PatientMedicalRecords.tsx

"use client";

import type { User } from "@/types/user.types";
import { mockDoctors } from "@/data/mockDoctors";
import { mockPatients } from "@/data/mockPatients";
import { useMedicalRecordStore } from "@/store/useMedicalRecordStore";

interface PatientMedicalRecordsProps {
  user: User;
}

export function PatientMedicalRecords({ user }: PatientMedicalRecordsProps) {
  const records = useMedicalRecordStore((state) => state.records);
  const patient = mockPatients.find((patient) => patient.userId === user.id);

  if (!patient) return null;

  const patientRecords = records.filter((record) => record.patientId === patient.id);

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">Mis expedientes médicos</h2>

      <div className="mt-5 space-y-4">
        {patientRecords.length === 0 && (
          <p className="text-sm text-slate-600">Aún no tienes expedientes creados por un médico.</p>
        )}

        {patientRecords.map((record) => {
          const doctor = mockDoctors.find((doctor) => doctor.id === record.doctorId);

          return (
            <article key={record.id} className="rounded-xl border border-slate-200 p-4">
              <p className="text-sm font-semibold text-slate-500">
                {new Date(record.createdAt).toLocaleString()} · Dr. {doctor?.name ?? "Sin asignar"}
              </p>
              <h3 className="mt-2 text-lg font-bold text-slate-900">{record.diagnosis}</h3>
              <p className="mt-2 text-sm text-slate-700">{record.notes}</p>
              <p className="mt-2 text-sm text-slate-600">
                <span className="font-semibold">Prescripción:</span> {record.prescriptions.join(", ")}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
