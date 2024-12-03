"use client";

import * as React from "react";
import dynamic from "next/dynamic";

// Import dynamique de BrowserRouter (désactivation du SSR)
const Router = dynamic(() => import("react-router-dom").then((mod) => mod.BrowserRouter), { ssr: false });

import CompagnyInformations from "@/components/app/CompagnyInformations";
import LegalReminders from "@/components/app/LegalReminders";
import FiscalAdvantages from "@/components/app/FiscalAdvantages";
import MainActions from "@/components/app/MainActions";
import PpvProgress from "@/components/app/PpvProgress";
import PpvDocumentation from "@/components/app/PpvDocumentation";
import Chatbot from "@/components/app/Chatbot";
import Timeline from "@/components/app/Timeline";
import { Routes, Route } from "react-router-dom"; // Pas besoin de dynamic ici
import SimulatorPage from "@/pages/ppv-simulator";
import RedacDocuments from "@/pages/redac-documents"; // Import de la page redac-documents

export default function SaasInterface() {
  const [companySize] = React.useState(11);
  const [fiscalYearStart, setFiscalYearStart] = React.useState<string>("Inconnue");

  return (
    <Router>
      <Routes>
        {/* Route principale */}
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-background">
              <main className="container mx-auto px-4 py-16 space-y-16 mt-16">
                {/* Mes Informations Section */}
                <section className="mb-16">
                  <CompagnyInformations
                    companySize={companySize}
                    onFiscalYearStartChange={setFiscalYearStart}
                  />
                </section>

                {/* Processus de mise en place */}
                <section className="bg-white rounded-lg shadow p-10 mb-16">
                  <Timeline fiscalYearStart={fiscalYearStart} />
                </section>

                {/* Section en trois colonnes */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
                  <LegalReminders />
                  <FiscalAdvantages />
                  <PpvProgress />
                </section>

                {/* Actions principales et Documentation */}
                <section className="mb-16">
                  <PpvDocumentation />
                </section>
              </main>

              {/* Chatbot */}
              <footer className="fixed bottom-6 right-6">
                <Chatbot />
              </footer>
            </div>
          }
        />
        {/* Route pour le simulateur */}
        <Route path="/ppv-simulator" element={<SimulatorPage />} />
        {/* Route pour la rédaction des documents */}
        <Route path="/redac-documents" element={<RedacDocuments />} />
      </Routes>
    </Router>
  );
}
