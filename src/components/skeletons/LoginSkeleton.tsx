export function LoginSkeleton() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-background p-6">
            <section className="w-full max-w-md rounded-lg border border-border bg-surface p-6 shadow-md animate-pulse">
                <div className="mb-6 h-6 w-40 rounded bg-secondary" />
                <div className="mb-4 h-10 w-full rounded bg-secondary" />
                <div className="mb-4 h-10 w-full rounded bg-secondary" />
                <div className="h-10 w-full rounded bg-secondary" />
            </section>
        </main>
    );
}