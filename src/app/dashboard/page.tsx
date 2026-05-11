// src/app/dashboard/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { DoctorDashboard } from "@/components/dashboard/DoctorDashboard";
import { PatientDashboard } from "@/components/dashboard/PatientDashboard";

export default function DashboardPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  if (user.role === "doctor") {
    return <DoctorDashboard user={user} />;
  }

  return <PatientDashboard user={user} />;
}
