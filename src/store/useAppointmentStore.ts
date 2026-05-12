// src/store/useAppointmentStore.ts

"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Appointment, AppointmentStatus } from "../types/appointment.types";
import { mockAppointments } from "../data/mockAppointments";

interface AppointmentState {
  appointments: Appointment[];
  hasHydrated: boolean;

  createAppointment: (appointment: Appointment) => void;
  updateAppointmentStatus: (
    appointmentId: string,
    status: AppointmentStatus
  ) => void;
  getAppointmentsByPatientId: (patientId: string) => Appointment[];
  getAppointmentsByDoctorId: (doctorId: string) => Appointment[];
  setHasHydrated: (value: boolean) => void;
}

export const useAppointmentStore = create<AppointmentState>()(
  persist(
    (set, get) => ({
      appointments: mockAppointments,
      hasHydrated: false,

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

      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "medsync-appointments",
      partialize: (state) => ({ appointments: state.appointments }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
