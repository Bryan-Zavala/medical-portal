// src/components/dashboard/PatientDashboard.tsx

import type { User } from "../../types/user.types";
import { PatientMetricsGrid } from "./PatientMetricsGrid";
import { CreateAppointmentForm } from "./CreateAppointmentForm";
import { PatientAppointments } from "./PatientAppointments";
import { PatientMedicalRecords } from "./PatientMedicalRecords";

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

        <PatientMetricsGrid user={user} />
        <CreateAppointmentForm user={user} />
        <PatientAppointments user={user} />
        <PatientMedicalRecords user={user} />
      </section>
    </main>
  );
}
