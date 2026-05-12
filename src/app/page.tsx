// import { Container } from "@/components/atoms/Container";
// import { Button } from "@/components/atoms/Button";
// import { Badge } from "@/components/atoms/Badge";
// import { Card } from "@/components/atoms/Card";
// import { FormField } from "@/components/molecules/FormField";
// import { SearchBar } from "@/components/molecules/SearchBar";
// import { StatCard } from "@/components/molecules/StatCard";
// import { PatientCard } from "@/components/molecules/PatientCard";
// import { AppointmentCard } from "@/components/molecules/AppointmentCard";
import { HomeMetricsSection } from "@/components/home/HomeMetricsSection";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ArticlesSection } from "@/components/home/ArticlesSection";
import { Footer } from "@/components/layout/Footer";
export default function Home() {
  return (
    <>
      <HeroSection />
      <HomeMetricsSection></HomeMetricsSection>
      <AboutSection />
      <ServicesSection />
      <ArticlesSection />
      <Footer></Footer>

      {/* <main className="min-h-screen py-10">
        <Container className="space-y-8">
          <section>
            <h1 className="text-3xl font-bold text-foreground">
              Design System - Medical Portal
            </h1>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Atoms</h2>

            <Card className="space-y-4">
              <div className="flex gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="danger">Danger</Button>
              </div>

              <div className="flex gap-3">
                <Badge variant="success">Activo</Badge>
                <Badge variant="warning">Pendiente</Badge>
                <Badge variant="danger">Urgente</Badge>
              </div>

              <FormField
                id="patient-name"
                label="Nombre del paciente"
                placeholder="Introduce el nombre"
              />
            </Card>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Molecules</h2>

            <SearchBar placeholder="Buscar paciente..." />

            <div className="grid gap-4 md:grid-cols-3">
              <StatCard
                title="Pacientes atendidos"
                value={128}
                description="Este mes"
                trend="+12%"
                trendVariant="success"
              />

              <StatCard
                title="Citas pendientes"
                value={24}
                description="Hoy"
                trend="Pendiente"
                trendVariant="warning"
              />

              <StatCard
                title="Urgencias"
                value={6}
                description="Últimas 24h"
                trend="Alta"
                trendVariant="danger"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <PatientCard name="María López" age={42} status="Activo" />

              <AppointmentCard
                patientName="Carlos Ruiz"
                time="10:30"
                type="Consulta general"
                status="Confirmada"
              />
            </div>
          </section>
        </Container>
      </main> */}
    </>
  );
}
