// src/components/dashboard/DoctorDashboard.tsx

import type { User } from "../../types/user.types";
import { DoctorMetricsGrid } from "./DoctorMetricsGrid";
import { DoctorAppointments } from "./DoctorAppointments";

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

        <DoctorMetricsGrid />
        <DoctorAppointments user={user} />
      </section>
    </main>
  );
}
