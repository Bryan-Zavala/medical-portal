// src/components/dashboard/DoctorDashboard.tsx

import type { User } from "../../types/user.types";
import { DoctorMetricsGrid } from "./DoctorMetricsGrid";
import { DoctorAppointments } from "./DoctorAppointments";
import { DoctorPatientsRecords } from "./DoctorPatientsRecords";
import { GranularErrorBoundary } from "@/components/atoms/GranularErrorBoundary";

interface DoctorDashboardProps {
  user: User;
}

export function DoctorDashboard({ user }: DoctorDashboardProps) {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-slate-900">
          Bienvenido Dr. {user.name}
        </h1>

        <GranularErrorBoundary>
          <DoctorMetricsGrid user={user} />
        </GranularErrorBoundary>
        <GranularErrorBoundary>
          <DoctorAppointments user={user} />
        </GranularErrorBoundary>
        <GranularErrorBoundary>
          <DoctorPatientsRecords user={user} />
        </GranularErrorBoundary>
      </section>
    </main>
  );
}
