const articles = [
  {
    title: "Consejos para preparar una consulta médica",
    description:
      "Lleva tus síntomas anotados, medicación actual y preguntas importantes.",
  },
  {
    title: "Importancia del seguimiento médico",
    description:
      "Las revisiones periódicas ayudan a detectar problemas a tiempo.",
  },
  {
    title: "Gestión digital de citas",
    description:
      "Un sistema online reduce errores y mejora la organización clínica.",
  },
];

export function ArticlesSection() {
  return (
    <section className="px-6 py-20 bg-white">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase text-blue-600">
          Artículos
        </p>

        <h2 className="mt-3 text-4xl font-bold text-slate-900">
          Información útil para pacientes
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.title}
              className="rounded-2xl border border-slate-200 p-6"
            >
              <h3 className="text-xl font-semibold text-slate-900">
                {article.title}
              </h3>

              <p className="mt-3 text-slate-600">{article.description}</p>

              <button className="mt-5 text-sm font-semibold text-blue-600 hover:underline">
                Leer más
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
