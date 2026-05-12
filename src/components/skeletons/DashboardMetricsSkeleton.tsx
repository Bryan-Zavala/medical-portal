import { CardSkeleton } from "./CardSkeleton";

export function DashboardMetricsSkeleton() {
    return (
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
        </section>
    );
}