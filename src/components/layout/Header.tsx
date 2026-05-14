import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import { Button } from "@/components/atoms/Button";

export function Header() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-white/30">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold text-sky-700 mt-1">
          <img src="/logo-remove.png" width={150} alt="" />
        </Link>

        <nav className="hidden gap-6 text-sm font-medium md:flex">
          <Link href="#about">Quiénes somos</Link>
          <Link href="#portal">Nuestra plataforma</Link>
          <Link href="#services">Servicios</Link>
          <Link href="/appointments"></Link>
        </nav>

        <Link href="/login">
          <Button>Acceder</Button>
        </Link>
      </Container>
    </header>
  );
}
