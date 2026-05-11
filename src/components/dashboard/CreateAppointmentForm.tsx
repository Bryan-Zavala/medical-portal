// src/components/dashboard/CreateAppointmentForm.tsx

"use client";

import { useState } from "react";
import type { Appointment } from "../../types/appointment.types";
import type { User } from "@/types/user.types";
import { mockDoctors } from "../../data/mockDoctors";
import { mockPatients } from "@/data/mockPatients";
import { useAppointmentStore } from "@/store/useAppointmentStore";

interface CreateAppointmentFormProps {
  user: User;
}

export function CreateAppointmentForm({ user }: CreateAppointmentFormProps) {
  const createAppointment = useAppointmentStore(
    (state) => state.createAppointment,
  );

  const patient = mockPatients.find((patient) => patient.userId === user.id);

  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!patient) {
      setMessage("No se encontró el perfil del paciente");
      return;
    }

    if (!doctorId || !date || !reason.trim()) {
      setMessage("Todos los campos son obligatorios");
      return;
    }

    const newAppointment: Appointment = {
      id: crypto.randomUUID(),
      patientId: patient.id,
      doctorId,
      date,
      reason,
      status: "pending",
    };

    createAppointment(newAppointment);

    setDoctorId("");
    setDate("");
    setReason("");
    setMessage("Cita solicitada correctamente");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-2xl bg-white p-6 shadow-sm border border-slate-200"
    >
      <h2 className="text-2xl font-bold text-slate-900">Solicitar cita</h2>

      <div className="mt-5 grid gap-4">
        <select
          value={doctorId}
          onChange={(event) => setDoctorId(event.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3"
        >
          <option value="">Selecciona un doctor</option>

          {mockDoctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name} - {doctor.specialty}
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3"
        />

        <textarea
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          placeholder="Motivo de la cita"
          className="min-h-28 rounded-xl border border-slate-300 px-4 py-3"
        />

        {message && (
          <p className="text-sm font-medium text-blue-600">{message}</p>
        )}

        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Pedir cita
        </button>
      </div>
    </form>
  );
}
