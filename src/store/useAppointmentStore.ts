// src/store/useAppointmentStore.ts

"use client";

import { create } from "zustand";
import type { Appointment, AppointmentStatus } from "../types/appointment.types";
import { mockAppointments } from "../data/mockAppointments";

interface AppointmentState {
  appointments: Appointment[];

  createAppointment: (appointment: Appointment) => void;
  updateAppointmentStatus: (
    appointmentId: string,
    status: AppointmentStatus
  ) => void;
  getAppointmentsByPatientId: (patientId: string) => Appointment[];
  getAppointmentsByDoctorId: (doctorId: string) => Appointment[];
}

export const useAppointmentStore = create<AppointmentState>((set, get) => ({
  appointments: mockAppointments,

  createAppointment: (appointment) => {
    set((state) => ({
      appointments: [...state.appointments, appointment],
    }));
  },

  updateAppointmentStatus: (appointmentId, status) => {
    set((state) => ({
      appointments: state.appointments.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, status }
          : appointment
      ),
    }));
  },

  getAppointmentsByPatientId: (patientId) => {
    return get().appointments.filter(
      (appointment) => appointment.patientId === patientId
    );
  },

  getAppointmentsByDoctorId: (doctorId) => {
    return get().appointments.filter(
      (appointment) => appointment.doctorId === doctorId
    );
  },
}));