import { LoginForm } from "@/components/auth/LoginForm";

const STREAMING_DELAY_MS = 1000;

export async function StreamingLoginSection() {
  await new Promise((resolve) => setTimeout(resolve, STREAMING_DELAY_MS));

  return <LoginForm />;
}
