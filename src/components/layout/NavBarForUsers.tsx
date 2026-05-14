import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import { ButtonCloseSession } from "../atoms/ButtonCloseSession";
import Image from "next/image";

export function NavBarForUsers() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-white/30">
      <Container className="flex justify-between h-16 items-center">
        <Link href="/" className="text-xl font-bold text-sky-700 mt-1">
          <Image
            src="/logo-remove.webp"
            width={150}
            height={150}
            alt="logonavbar"
          />
        </Link>

        <nav className="flex gap-6 text-sm font-medium md:flex">
          <Link href={"/"} className="flex items-center left-6 top-6 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
              <Image
                src="/arrow.png"
                alt=""
                width={20}
                height={20}
                className="mr-5 hidden md:block"
              />
              Volver al inicio
          </Link>

          <ButtonCloseSession></ButtonCloseSession>
        </nav>
      </Container>
    </header>
  );
}
