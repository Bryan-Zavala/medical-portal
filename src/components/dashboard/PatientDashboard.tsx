// src/components/dashboard/PatientDashboard.tsx

import type { User } from "../../types/user.types";
import { PatientMetricsGrid } from "./PatientMetricsGrid";
import { CreateAppointmentForm } from "./CreateAppointmentForm";
import { PatientAppointments } from "./PatientAppointments";
import { PatientMedicalRecords } from "./PatientMedicalRecords";
import { GranularErrorBoundary } from "@/components/atoms/GranularErrorBoundary";

interface PatientDashboardProps {
  user: User;
}

export function PatientDashboard({ user }: PatientDashboardProps) {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-slate-900">
          Bienvenido {user.name}
        </h1>

        <GranularErrorBoundary>
          <PatientMetricsGrid user={user} />
        </GranularErrorBoundary>
        <GranularErrorBoundary>
          <CreateAppointmentForm user={user} />
        </GranularErrorBoundary>
        <GranularErrorBoundary>
          <PatientAppointments user={user} />
        </GranularErrorBoundary>
        <GranularErrorBoundary>
          <PatientMedicalRecords user={user} />
        </GranularErrorBoundary>
      </section>
    </main>
  );
}
