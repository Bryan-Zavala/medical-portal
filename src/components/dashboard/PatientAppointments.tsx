// src/components/dashboard/PatientAppointments.tsx

"use client";

import { useState } from "react";
import type { User } from "../../types/user.types";
import { mockDoctors } from "@/data/mockDoctors";
import { mockPatients } from "@/data/mockPatients";
import { useAppointmentStore } from "@/store/useAppointmentStore";

interface PatientAppointmentsProps {
  user: User;
}

export function PatientAppointments({ user }: PatientAppointmentsProps) {
  const appointments = useAppointmentStore((state) => state.appointments);

  const patient = mockPatients.find((patient) => patient.userId === user.id);

  if (!patient) return null;

  const myAppointments = appointments.filter(
    (appointment) => appointment.patientId === patient.id,
  );

  return (
    <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900">Mis citas</h2>

      <div className="mt-5 space-y-4">
        {myAppointments.map((appointment) => {
          const doctor = mockDoctors.find(
            (doctor) => doctor.id === appointment.doctorId,
          );

          return (
            <article
              key={appointment.id}
              className="rounded-xl border border-slate-200 p-4"
            >
              <p className="font-semibold text-slate-900">
                Doctor: {doctor?.name}
              </p>
              <p className="text-sm text-slate-600">
                Fecha: {new Date(appointment.date).toLocaleString()}
              </p>
              <p className="text-sm text-slate-600">
                Motivo: {appointment.reason}
              </p>
              <p className="text-sm font-semibold text-blue-600">
                Estado: {appointment.status}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
