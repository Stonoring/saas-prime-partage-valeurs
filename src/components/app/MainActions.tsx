"use client";

import {
  Bot,
  CalendarRange,
  PenTool,
  FileEdit,
  Handshake,
  Upload,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // Import du routeur

export default function MainActions() {
  const router = useRouter(); // Hook pour naviguer
  const actions = [
    { icon: CalendarRange, label: "Planifier" },
    {
      icon: PenTool,
      label: "Composer",
      onClick: () => router.push("/composer"), // Navigation pour "Composer"
    },
    { icon: FileEdit, label: "Rédiger" },
    { icon: Handshake, label: "Négocier" },
    { icon: Upload, label: "Déposer" },
    { icon: CreditCard, label: "Verser" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="h-20 flex flex-col items-center justify-center space-y-2"
            onClick={action.onClick} // Gestionnaire d'événement pour les actions
          >
            <action.icon className="h-6 w-6" />
            <span>{action.label}</span>
          </Button>
        ))}
      </div>
      <Button className="w-full h-10 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/35">
        <Bot className="mr-2 h-5 w-5" />
        Faire ses démarches avec l&apos;IA
      </Button>
    </div>
  );
}
