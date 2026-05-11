// src/components/dashboard/DoctorDashboard.tsx

import type { User } from "../../types/user.types";
import { DoctorMetricsGrid } from "./DoctorMetricsGrid";
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

        <p className="mt-2 text-slate-600">
          Panel médico: gestión de pacientes, citas e historial clínico.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Citas pendientes</h2>
            <p className="mt-2 text-slate-600">
              Revisa las próximas citas médicas.
            </p>
          </article>

          <article className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Pacientes</h2>
            <p className="mt-2 text-slate-600">
              Consulta datos de tus pacientes.
            </p>
          </article>

          <article className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Historial médico</h2>
            <p className="mt-2 text-slate-600">
              Acceso a información médica sensible.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
