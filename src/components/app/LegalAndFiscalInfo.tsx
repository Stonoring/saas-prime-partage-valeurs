"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Zap } from "lucide-react";

export default function LegalAndFiscalInfo() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Rappels légaux */}
      <Card className="col-span-2 md:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Info className="h-5 w-5 mr-2 text-blue-500" />
            Rappels légaux importants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1 text-sm">
            <li>
              <strong>Seuils :</strong> 11 à 49 salariés
            </li>
            <li>
              <strong>Conditions :</strong> Bénéfice positif
            </li>
            <li>
              <strong>Plafonds :</strong> 3000€ / 6000€ (avec intéressement)
            </li>
            <li>
              <strong>Échéance :</strong> Obligatoire dès 01/2025
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Avantages fiscaux */}
      <Card className="col-span-2 md:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Zap className="h-5 w-5 mr-2 text-yellow-500" />
            Les avantages de la mise en place
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1 text-sm">
            <li>
              <b>0% de forfait social :</b> Une économie immédiate.
            </li>
            <li>
              <b>Cotisations sociales réduites :</b> Moins de charges, plus de marge.
            </li>
            <li>
              <b>Exonération d'impôt salarié :</b> Une prime nette pour vos équipes.
            </li>
            <li>
              <b>Déduction fiscale :</b> Réduisez vos impôts, maximisez vos bénéfices.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
