// src/app/dashboard/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { DoctorDashboard } from "../../components/dashboard/DoctorDashboard";
import { PatientDashboard } from "../../components/dashboard/PatientDashboard";

export default function DashboardPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (hasHydrated && !user) {
      router.push("/login");
    }
  }, [hasHydrated, user, router]);

  if (!hasHydrated) return null;
  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
      <div className="fixed right-6 top-6 z-40">
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg"
        >
          Cerrar sesión
        </button>
      </div>

      {user.role === "doctor" ? (
        <DoctorDashboard user={user} />
      ) : (
        <PatientDashboard user={user} />
      )}
    </>
  );
}
