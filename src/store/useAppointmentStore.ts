"use client";

import { create } from "zustand";
import {
  createAppointmentSchema,
  type CreateAppointmentPayload,
} from "../lib/validations/appointment.schema";
import type {
  Appointment,
  AppointmentStatus,
} from "../types/appointment.types";
import { mockAppointments } from "../data/mockAppointments";

interface AppointmentState {
  appointments: Appointment[];

  setAppointments: (appointments: Appointment[]) => void;
  createAppointment: (payload: CreateAppointmentPayload) => Appointment;
  updateAppointmentStatus: (
    appointmentId: string,
    status: AppointmentStatus,
  ) => void;
  deleteAppointment: (appointmentId: string) => void;

  getAppointmentsByPatientId: (patientId: string) => Appointment[];
  getAppointmentsByDoctorId: (doctorId: string) => Appointment[];
}

export const useAppointmentStore = create<AppointmentState>((set, get) => ({
  appointments: mockAppointments,

  setAppointments: (appointments) => {
    set({ appointments });
  },

  createAppointment: (rawPayload) => {
    // reserva de citas con validación y colisiones de horario
    const payload = createAppointmentSchema.parse(rawPayload);

    // Comparamos la cita nueva con las del mismo doctor
    const requestedStart = new Date(payload.startTime).getTime();
    const requestedEnd = new Date(payload.endTime).getTime();

    const hasCollision = get().appointments.some((existingAppointment) => {
      // Solo importa si es el mismo doctor y la cita sigue activa
      if (existingAppointment.doctorId !== payload.doctorId) return false;
      if (existingAppointment.status === "cancelled") return false;

      const existingStart = new Date(existingAppointment.startTime).getTime();
      const existingEnd = new Date(existingAppointment.endTime).getTime();

      // Hay choque si los rangos de tiempo se cruzan
      return requestedStart < existingEnd && requestedEnd > existingStart;
    });

    if (hasCollision) {
      // Bloqueamos la reserva cuando el horario ya está ocupado
      throw new Error(
        "El doctor ya tiene una cita programada en este horario o se solapa con otra.",
      );
    }

    // Si no hay choque, guardamos la cita en el mock local
    const newAppointment: Appointment = {
      id: crypto.randomUUID(),
      ...payload,
      status: "pending",
    };

    set((state) => ({
      appointments: [...state.appointments, newAppointment],
    }));

    return newAppointment;
  },

  updateAppointmentStatus: (appointmentId, status) => {
    set((state) => ({
      appointments: state.appointments.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, status }
          : appointment,
      ),
    }));
  },

  deleteAppointment: (appointmentId) => {
    set((state) => ({
      appointments: state.appointments.filter(
        (appointment) => appointment.id !== appointmentId,
      ),
    }));
  },

  getAppointmentsByPatientId: (patientId) => {
    return get().appointments.filter(
      (appointment) => appointment.patientId === patientId,
    );
  },

  getAppointmentsByDoctorId: (doctorId) => {
    return get().appointments.filter(
      (appointment) => appointment.doctorId === doctorId,
    );
  },
}));
