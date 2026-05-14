"use client";

// src/components/dashboard/PatientDashboard.tsx

import { useState } from "react";

import type { User } from "../../types/user.types";

import { PatientMetricsGrid } from "./PatientMetricsGrid";
import { CreateAppointmentForm } from "./CreateAppointmentForm";
import { PatientAppointments } from "./PatientAppointments";
import { PatientMedicalRecords } from "./PatientMedicalRecords";
import { ProfileEditModal } from "./ProfileEditModal";

import { Button } from "@/components/atoms/Button";

interface PatientDashboardProps {
  user: User;
}

export function PatientDashboard({
  user,
}: PatientDashboardProps) {
  const [isProfileModalOpen, setIsProfileModalOpen] =
    useState(false);

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <section className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-slate-900">
            Bienvenido {user.name}
          </h1>

          <Button onClick={() => setIsProfileModalOpen(true)}>
            Editar perfil
          </Button>
        </div>

        <PatientMetricsGrid user={user} />

        <CreateAppointmentForm user={user} />

        <PatientAppointments user={user} />

        <PatientMedicalRecords user={user} />

        <ProfileEditModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          initialName={user.name}
          initialEmail={user.email}
        />
      </section>
    </main>
  );
}
