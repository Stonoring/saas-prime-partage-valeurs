"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

export default function LegalReminders() {
  return (
    <Card className="h-full">
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
  );
}
