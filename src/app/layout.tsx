import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { QueryProvider } from "@/providers/query-provider";
import { FocusSyncProvider } from "@/providers/focus-sync-provider";
import "./globals.css";
import { Toaster } from "sonner";

/* Carga fuentes de forma optimizada con next/font*/
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* Metadata: mejora SEO, accesibilidad y arquitectura de la app */
export const metadata: Metadata = {
  title: "MedSync Pro",
  description:
    "Portal médico para gestión de pacientes, citas y expedientes clínicos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <QueryProvider>
          <FocusSyncProvider>
            <main className="flex-1">{children}</main>
          </FocusSyncProvider>
        </QueryProvider>

        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
