export function CardSkeleton() {
    return (
        <div
            className="
                rounded-lg
                border border-border
                bg-surface
                p-4
                shadow-md
                animate-pulse
            "
        >
            <div className="mb-4 h-4 w-1/2 rounded bg-secondary" />
            <div className="mb-3 h-8 w-1/3 rounded bg-secondary" />
            <div className="h-3 w-2/3 rounded bg-secondary" />
        </div>
    );
}