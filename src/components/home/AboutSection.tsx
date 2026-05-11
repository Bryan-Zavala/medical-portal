export function AboutSection() {
  return (
    <section className="px-6 py-20 bg-white">
      <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-2 items-center">
        <div>
          <p className="text-sm font-semibold uppercase text-blue-600">
            Sobre nosotros
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Portal médico para pacientes y profesionales
          </h2>

          <p className="mt-5 text-slate-600 leading-7">
            Nuestra plataforma permite gestionar citas médicas, consultar
            información relevante y facilitar la comunicación entre pacientes y
            médicos de forma clara, segura y organizada.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-100 p-8">
          <h3 className="text-xl font-semibold text-slate-900">
            Objetivo principal
          </h3>

          <p className="mt-4 text-slate-600 leading-7">
            Centralizar la gestión de citas y datos médicos, diferenciando
            correctamente los permisos según el rol del usuario.
          </p>
        </div>
      </div>
    </section>
  );
}
