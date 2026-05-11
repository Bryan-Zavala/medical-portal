"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { validateLoginForm, type LoginErrors } from "@/lib/auth-validation";
import { Header } from "../layout/Header";
export function LoginForm() {
  const router = useRouter();

  const login = useAuthStore((state) => state.login);
  const failedAttempts = useAuthStore((state) => state.failedAttempts);
  const isBlocked = useAuthStore((state) => state.isBlocked);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<LoginErrors>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isBlocked) {
      setErrors({
        general: "Cuenta bloqueada temporalmente por demasiados intentos",
      });
      return;
    }

    const validationErrors = validateLoginForm(email, password);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const isValidLogin = login(email, password);

    if (!isValidLogin) {
      setErrors({
        general: `Credenciales incorrectas. Intentos fallidos: ${
          failedAttempts + 1
        }/3`,
      });
      return;
    }

    setErrors({});
    router.push("/dashboard");
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <Header></Header>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"
      >
        <h1 className="text-3xl font-bold text-slate-900">Iniciar sesión</h1>

        <p className="mt-2 text-slate-600">Accede con tus credenciales.</p>

        <div className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              disabled={isBlocked}
              onChange={(event) => {
                setEmail(event.target.value);
                setErrors({});
              }}
              placeholder="doctor@clinic.com"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 disabled:bg-slate-200"
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Contraseña
            </label>

            <input
              type="password"
              value={password}
              disabled={isBlocked}
              onChange={(event) => {
                setPassword(event.target.value);
                setErrors({});
              }}
              placeholder="********"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 disabled:bg-slate-200"
            />

            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {errors.general && (
            <p className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-600">
              {errors.general}
            </p>
          )}

          <button
            type="submit"
            disabled={isBlocked}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            Acceder
          </button>
        </div>

        {/* <div className="mt-6 rounded-xl bg-slate-100 p-4 text-sm text-slate-600">
          <p>Doctor: doctor@clinic.com / Doctor123!</p>
          <p>Paciente: paciente@mail.com / Paciente123!</p>
        </div> */}
      </form>
    </section>
  );
}
