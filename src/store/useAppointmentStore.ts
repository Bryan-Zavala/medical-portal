// src/store/useAppointmentStore.ts

"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
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
  hasHydrated: boolean;

  setAppointments: (appointments: Appointment[]) => void;
  createAppointment: (payload: CreateAppointmentPayload) => Appointment;
  updateAppointmentStatus: (
    appointmentId: string,
    status: AppointmentStatus,
  ) => void;
  deleteAppointment: (appointmentId: string) => void;
  getAppointmentsByPatientId: (patientId: string) => Appointment[];
  getAppointmentsByDoctorId: (doctorId: string) => Appointment[];
  setHasHydrated: (value: boolean) => void;
}

export const useAppointmentStore = create<AppointmentState>()(
  persist(
    (set, get) => ({
      appointments: mockAppointments,
      hasHydrated: false,

      setAppointments: (appointments) => {
        set({ appointments });
      },

      createAppointment: (rawPayload) => {
        const payload = createAppointmentSchema.parse(rawPayload);

        const requestedStart = new Date(payload.startTime).getTime();
        const requestedEnd = new Date(payload.endTime).getTime();

        const hasCollision = get().appointments.some((existingAppointment) => {
          if (existingAppointment.doctorId !== payload.doctorId) return false;
          if (existingAppointment.status === "cancelled") return false;

          const existingStart = new Date(
            existingAppointment.startTime,
          ).getTime();
          const existingEnd = new Date(existingAppointment.endTime).getTime();

          return requestedStart < existingEnd && requestedEnd > existingStart;
        });

        if (hasCollision) {
          throw new Error(
            "El doctor ya tiene una cita programada en este horario o se solapa con otra.",
          );
        }

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

      setHasHydrated: (value) => {
        set({ hasHydrated: value });
      },
    }),
    {
      name: "medical-appointments",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ appointments: state.appointments }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
