"use client";
import * as React from "react";
import CompagnyInformations from "@/components/app/CompagnyInformations";
import LegalAndFiscalInfo from "@/components/app/LegalAndFiscalInfo";
import MainActions from "@/components/app/MainActions";
import PpvProgress from "@/components/app/PpvProgress";
import PpvDocumentation from "@/components/app/PpvDocumentation";
import Chatbot from "@/components/app/Chatbot";

export default function SaasInterface() {
  const [companySize] = React.useState(11);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-6 space-y-6 mt-16">
        {/* Mes Informations Section */}
        <CompagnyInformations companySize={companySize} />

        {/* Rappels légaux et Avantages fiscaux */}
        <LegalAndFiscalInfo />

        {/* Actions principales et Suivi côte à côte */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mes démarches */}
          <MainActions />

          {/* Suivi des démarches */}
          <PpvProgress />
        </div>

        {/* Documentation PPV */}
        <PpvDocumentation />
      </main>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}
