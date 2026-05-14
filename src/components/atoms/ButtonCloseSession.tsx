"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export function ButtonCloseSession() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="">
      <button
        type="button"
        onClick={handleLogout}
        className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
