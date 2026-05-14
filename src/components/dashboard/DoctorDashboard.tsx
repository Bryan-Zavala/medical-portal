// src/components/dashboard/DoctorDashboard.tsx

"use client";

import { useState } from "react";

import type { User } from "../../types/user.types";

import { DoctorMetricsGrid } from "./DoctorMetricsGrid";
import { DoctorAppointments } from "./DoctorAppointments";
import { DoctorPatientsRecords } from "./DoctorPatientsRecords";
import { ProfileEditModal } from "./ProfileEditModal";

import { Button } from "@/components/atoms/Button";
import { NavBarForUsers } from "../layout/NavBarForUsers";

interface DoctorDashboardProps {
  user: User;
}

export function DoctorDashboard({ user }: DoctorDashboardProps) {
  // Estado para controlar apertura/cierre del modal
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 pt-25">
      <section className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-slate-900">
            Bienvenido Dr. {user.name}
          </h1>

          {/* Botón abrir modal */}
          <Button onClick={() => setIsProfileModalOpen(true)}>
            Editar perfil
          </Button>
        </div>
        <NavBarForUsers></NavBarForUsers>
        <DoctorMetricsGrid user={user} />
        <DoctorAppointments user={user} />
        <DoctorPatientsRecords user={user} />

        {/* Modal edición perfil */}
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
