"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle, Clock } from "lucide-react";

export default function PpvProgress() {
  const steps = [
    {
      icon: Calendar,
      label: "Mise en place PPV",
      status: "Échéance : 01/01/2025",
      variant: "outline", // Respecte le type défini
    },
    {
      icon: CheckCircle,
      label: "Déclaration PPV",
      status: "Complété",
      variant: "secondary", // Respecte le type défini
      color: "text-green-500",
    },
    {
      icon: Clock,
      label: "Dépôt accord PPV",
      status: "En cours",
      variant: "default", // Corrigé pour respecter le type
      color: "text-yellow-500",
    },
  ];

  return (
    <Card className="col-span-2 md:col-span-1">
      <CardHeader>
        <CardTitle>Suivi des démarches PPV</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="flex items-center">
                <step.icon className={`mr-2 h-4 w-4 ${step.color || ""}`} />
                {step.label}
              </span>
              <Badge variant="outline">Texte du badge</Badge>
              </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
