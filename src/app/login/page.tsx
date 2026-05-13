import { Suspense } from "react";
import { LoginSkeleton } from "@/components/skeletons/LoginSkeleton";
import { StreamingLoginSection } from "@/components/auth/StreamingLoginSection";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <StreamingLoginSection />
    </Suspense>
  );
}
