const services = [
  {
    title: "Gestión de citas",
    description: "Reserva, confirma o cancela citas médicas desde el portal.",
  },
  {
    title: "Panel para médicos",
    description: "Consulta pacientes, citas e información médica sensible.",
  },
  {
    title: "Panel para pacientes",
    description: "Visualiza tus citas y datos básicos de forma sencilla.",
  },
];

export function ServicesSection() {
  return (
    <section className="px-6 py-20 bg-slate-100">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase text-blue-600">
          Servicios
        </p>

        <h2 className="mt-3 text-4xl font-bold text-slate-900">
          Qué permite hacer la plataforma
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-slate-900">
                {service.title}
              </h3>

              <p className="mt-3 text-slate-600">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
