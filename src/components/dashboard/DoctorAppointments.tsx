// src/components/dashboard/DoctorAppointments.tsx

"use client";

import type { User } from "../../types/user.types";
import { mockDoctors } from "@/data/mockDoctors";
import { mockPatients } from "@/data/mockPatients";
import { useAppointmentStore } from "@/store/useAppointmentStore";

interface DoctorAppointmentsProps {
  user: User;
}

export function DoctorAppointments({ user }: DoctorAppointmentsProps) {
  const appointments = useAppointmentStore((state) => state.appointments);
  const updateAppointmentStatus = useAppointmentStore(
    (state) => state.updateAppointmentStatus,
  );

  const doctor = mockDoctors.find((doctor) => doctor.userId === user.id);

  if (!doctor) return null;

  const doctorAppointments = appointments.filter(
    (appointment) => appointment.doctorId === doctor.id,
  );

  return (
    <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900">Citas de pacientes</h2>

      <div className="mt-5 space-y-4">
        {doctorAppointments.map((appointment) => {
          const patient = mockPatients.find(
            (patient) => patient.id === appointment.patientId,
          );

          return (
            <article
              key={appointment.id}
              className="rounded-xl border border-slate-200 p-4"
            >
              <p className="font-semibold text-slate-900">
                Paciente: {patient?.name}
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

              {appointment.status === "pending" && (
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() =>
                      updateAppointmentStatus(appointment.id, "confirmed")
                    }
                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white"
                  >
                    Confirmar
                  </button>

                  <button
                    onClick={() =>
                      updateAppointmentStatus(appointment.id, "cancelled")
                    }
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
