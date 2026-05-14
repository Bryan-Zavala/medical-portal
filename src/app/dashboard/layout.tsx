import { QueryProvider } from "@/providers/query-provider";
import { FocusSyncProvider } from "@/providers/focus-sync-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <FocusSyncProvider>
        <div className="flex-1">{children}</div>
      </FocusSyncProvider>
    </QueryProvider>
  );
}