import { DashboardPageClient } from "@/components/dashboard/DashboardPageClient";

const STREAMING_DELAY_MS = 1800;

export async function StreamingDashboardSection() {
  await new Promise((resolve) => setTimeout(resolve, STREAMING_DELAY_MS));

  return <DashboardPageClient />;
}
