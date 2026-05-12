// src/components/dashboard/CreateAppointmentForm.tsx

"use client";

import { useMemo, useState } from "react";
import type { Appointment } from "../../types/appointment.types";
import type { User } from "@/types/user.types";
import { mockDoctors } from "../../data/mockDoctors";
import { mockPatients } from "@/data/mockPatients";
import { useAppointmentStore } from "@/store/useAppointmentStore";

interface CreateAppointmentFormProps {
  user: User;
}

function getCurrentDateTimeLocal() {
  const now = new Date();
  now.setSeconds(0, 0);
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 16);
}

export function CreateAppointmentForm({ user }: CreateAppointmentFormProps) {
  const appointments = useAppointmentStore((state) => state.appointments);
  const createAppointment = useAppointmentStore(
    (state) => state.createAppointment,
  );

  const patient = mockPatients.find((patient) => patient.userId === user.id);

  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState("");

  const minDateTime = useMemo(() => getCurrentDateTimeLocal(), []);

  const bookedSlots = appointments.filter(
    (appointment) =>
      appointment.doctorId === doctorId && appointment.status !== "cancelled",
  );

  const isBooked = bookedSlots.some((appointment) => appointment.date === date);

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

    if (new Date(date) < new Date(minDateTime)) {
      setMessage("No puedes pedir una cita anterior al día y hora actual");
      return;
    }

    if (isBooked) {
      setMessage("Ese horario ya está ocupado para este doctor");
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
    setMessage("");
    setToast("Cita concretada correctamente");
    window.setTimeout(() => setToast(""), 3000);
  };

  return (
    <>
      {toast && (
        <div className="fixed left-1/2 top-6 -translate-x-1/2 z-50 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 font-semibold text-green-700 shadow-lg">
          {toast}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-2xl bg-white p-6 shadow-sm border border-slate-200"
      >
        <h2 className="text-2xl font-bold text-slate-900">Solicitar cita</h2>

        <div className="mt-5 grid gap-4">
          <select
            value={doctorId}
            onChange={(event) => {
              setDoctorId(event.target.value);
              setDate("");
              setMessage("");
            }}
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
            min={minDateTime}
            onChange={(event) => {
              setDate(event.target.value);
              setMessage("");
            }}
            className="rounded-xl border border-slate-300 px-4 py-3"
          />

          {doctorId && bookedSlots.length > 0 && (
            <p className="text-sm text-slate-600">
              Horarios ocupados:{" "}
              {bookedSlots
                .map((slot) => new Date(slot.date).toLocaleString())
                .join(" · ")}
            </p>
          )}

          <textarea
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder="Motivo de la cita"
            className="min-h-28 rounded-xl border border-slate-300 px-4 py-3"
          />

          {message && (
            <p className="text-sm font-medium text-red-600">{message}</p>
          )}

          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Pedir cita
          </button>
        </div>
      </form>
    </>
  );
}
