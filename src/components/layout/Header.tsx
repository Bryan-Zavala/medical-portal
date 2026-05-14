import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/atoms/Container";
import { Button } from "@/components/atoms/Button";

export function Header() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-white/30">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold text-sky-700 mt-1">
          <Image 
            src="/logo-remove.png" 
            alt="Logo del Portal Médico" 
            width={150} 
            height={50} 
            priority
            style={{ width: "150px", height: "auto" }}
          />
        </Link>

        <nav className="hidden gap-6 text-sm font-medium md:flex">
          <Link href="/#about">Quiénes somos</Link>
          <Link href="/#services">Qué hacemos</Link>
          <Link href="/#articles">Artículos</Link>
          <Link href="/appointments">Citas</Link>
        </nav>

        <Link href="/login">
          <Button>Acceder</Button>
        </Link>
      </Container>
    </header>
  );
}
