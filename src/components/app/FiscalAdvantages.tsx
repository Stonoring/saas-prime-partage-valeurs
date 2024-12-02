"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";

export default function FiscalAdvantages() {
  return (
    <Card className="h-full">
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
  );
}
