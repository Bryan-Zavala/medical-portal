import { Suspense } from "react";
import { StreamingLoginSection } from "@/components/auth/StreamingLoginSection";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <StreamingLoginSection />
    </Suspense>
  );
}
