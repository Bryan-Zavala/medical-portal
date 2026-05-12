import { DashboardMetricsSkeleton } from "./DashboardMetricsSkeleton";

export function DashboardSkeleton() {
    return (
        <main className="min-h-screen bg-background p-6">
            <section className="mb-8">
                <div className="mb-3 h-8 w-64 rounded bg-secondary animate-pulse" />
                <div className="h-4 w-96 rounded bg-secondary animate-pulse" />
            </section>

            <DashboardMetricsSkeleton />

            <section className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="h-72 rounded-lg border border-border bg-surface p-4 shadow-md animate-pulse" />
                <div className="h-72 rounded-lg border border-border bg-surface p-4 shadow-md animate-pulse" />
            </section>
        </main>
    );
}