import { LoginForm } from "@/components/auth/LoginForm";

const STREAMING_DELAY_MS = 0;

export async function StreamingLoginSection() {
  await new Promise((resolve) => setTimeout(resolve, STREAMING_DELAY_MS));

  return <LoginForm />;
}
