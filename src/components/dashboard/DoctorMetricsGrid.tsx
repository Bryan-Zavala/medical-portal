// src/components/dashboard/DoctorMetricsGrid.tsx

"use client";

import { StatCard } from "@/components/molecules/StatCard";
import { useAppointmentStore } from "@/store/useAppointmentStore";
import { mockMedicalRecords } from "../../data/mockMedicalRecords";
import { mockPatients } from "@/data/mockPatients";

export function DoctorMetricsGrid() {
  const appointments = useAppointmentStore((state) => state.appointments);

  const totalAppointments = appointments.length;

  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "pending",
  ).length;

  const confirmedAppointments = appointments.filter(
    (appointment) => appointment.status === "confirmed",
  ).length;

  const totalPatients = mockPatients.length;
  const totalMedicalRecords = mockMedicalRecords.length;

  return (
    <section className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Citas totales"
        value={totalAppointments}
        description="Todas las citas registradas"
      />

      <StatCard
        title="Citas pendientes"
        value={pendingAppointments}
        description="Citas esperando confirmación"
      />

      <StatCard
        title="Citas confirmadas"
        value={confirmedAppointments}
        description="Citas ya confirmadas"
      />

      <StatCard
        title="Pacientes"
        value={totalPatients}
        description={`${totalMedicalRecords} historiales médicos`}
      />
    </section>
  );
}
