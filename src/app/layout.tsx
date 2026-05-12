import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { QueryProvider } from "@/providers/query-provider";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

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
    // <html
    //   lang="en"
    //   className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    // >
    //   <body className="min-h-full flex flex-col">{children}</body>
    // </html>
    /* Idioma: accesibilidad, lectores de pantalla, SEO, semántica correcta del documento*/
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <QueryProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
