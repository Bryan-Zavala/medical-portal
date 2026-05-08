"use client";

import { create } from "zustand";
import type { Appointment, AppointmentStatus } from "../types/appointment.types";
import { mockAppointments } from "../data/mockAppointments";
// se definen las funciones de las citas
interface AppointmentState {
  appointments: Appointment[];

  setAppointments: (appointments: Appointment[]) => void;
  createAppointment: (appointment: Appointment) => void;
  updateAppointmentStatus: (
    appointmentId: string,
    status: AppointmentStatus
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

  deleteAppointment: (appointmentId) => {
    set((state) => ({
      appointments: state.appointments.filter(
        (appointment) => appointment.id !== appointmentId
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