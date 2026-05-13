import { Container } from "@/components/atoms/Container";

export function StreamingMetricsSkeleton() {
  return (
    <section className="bg-slate-50 py-16" aria-label="Cargando métricas">
      <Container>
        <div className="mb-10 max-w-3xl animate-pulse">
          <div className="h-4 w-44 rounded bg-slate-200" />
          <div className="mt-4 h-10 w-72 rounded bg-slate-200" />
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <article
              key={item}
              className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mx-auto mb-5 h-8 w-36 rounded bg-slate-200" />
              <div className="mx-auto mb-5 h-54 w-54 rounded-full bg-slate-200" />
              <div className="mx-auto h-4 w-44 rounded bg-slate-200" />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
