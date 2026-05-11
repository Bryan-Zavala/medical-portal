// src/components/dashboard/PatientDashboard.tsx

import type { User } from "../../types/user.types";

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

        <p className="mt-2 text-slate-600">
          Panel de paciente: consulta tus citas y datos personales.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Mis citas</h2>
            <p className="mt-2 text-slate-600">
              Consulta tus próximas citas médicas.
            </p>
          </article>

          <article className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Mis datos</h2>
            <p className="mt-2 text-slate-600">Revisa tu información básica.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
