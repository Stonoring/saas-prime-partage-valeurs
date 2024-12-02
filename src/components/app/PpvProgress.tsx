"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle, Clock, List } from "lucide-react";

export default function PpvProgress() {
  const steps = [
    {
      icon: Calendar,
      label: "Mise en place PPV",
      status: "Échéance : 01/01/2025",
      color: "text-blue-500",
    },
    {
      icon: CheckCircle,
      label: "Déclaration PPV",
      status: "Complété",
      color: "text-green-500",
    },
    {
      icon: Clock,
      label: "Dépôt accord PPV",
      status: "En cours",
      color: "text-yellow-500",
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <List className="h-5 w-5 mr-2 text-purple-500" />
          Suivi des démarches PPV
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="flex items-center">
                <step.icon className={`mr-2 h-5 w-5 ${step.color}`} />
                <span className="text-sm font-medium">{step.label}</span>
              </span>
              <Badge variant="outline" className="text-xs">
                {step.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
