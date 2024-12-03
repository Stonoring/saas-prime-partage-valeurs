import React from "react";
import { Button } from "@/components/ui/button";
import { PenLine, FileText, CheckSquare, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TimelineStep {
  title: string;
  description: string;
  action: string;
  icon: React.ReactNode;
  getDate: (startDate: Date) => Date;
}

const timelineSteps: TimelineStep[] = [
  {
    title: "Composer",
    description:
      "Définition des règles et simulation des montants des primes selon les objectifs.",
    action: "SIMULER",
    icon: <PenLine className="w-6 h-6" />,
    getDate: (startDate: Date) => {
      const composerDate = new Date(startDate);
      composerDate.setMonth(composerDate.getMonth() + 6);
      return composerDate;
    },
  },
  {
    title: "Rédiger",
    description:
      "Rédaction automatique des documents nécessaires à la mise en place de l'accord.",
    action: "GÉNÉRER LES DOCUMENTS",
    icon: <FileText className="w-6 h-6" />,
    getDate: (startDate: Date) => {
      const composerDate = new Date(startDate);
      composerDate.setMonth(composerDate.getMonth() + 6);
      const rédigerDate = new Date(composerDate);
      rédigerDate.setDate(rédigerDate.getDate() + 15);
      return rédigerDate;
    },
  },
  {
    title: "Finaliser",
    description:
      "Finalisation de l'accord et dépôt auprès des autorités compétentes pour validation.",
    action: "SOUMETTRE",
    icon: <CheckSquare className="w-6 h-6" />,
    getDate: (startDate: Date) => {
      const composerDate = new Date(startDate);
      composerDate.setMonth(composerDate.getMonth() + 6);
      const finaliserDate = new Date(composerDate);
      finaliserDate.setMonth(finaliserDate.getMonth() + 10);
      return finaliserDate;
    },
  },
  {
    title: "Verser",
    description: "Versement des primes aux collaborateurs dans les délais impartis.",
    action: "VERSER LES PRIMES",
    icon: <DollarSign className="w-6 h-6" />,
    getDate: (startDate: Date) => {
      const composerDate = new Date(startDate);
      composerDate.setMonth(composerDate.getMonth() + 6);
      const verserDate = new Date(composerDate);
      verserDate.setMonth(verserDate.getMonth() + 12);
      return verserDate;
    },
  },
];

interface TimelineProps {
  fiscalYearStart: string;
}

const convertToISO = (dateStr: string): string => {
  const parts = dateStr.split("/");
  if (parts.length !== 3) return "Invalid Date";
  const [day, month, year] = parts;
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

const Timeline: React.FC<TimelineProps> = ({ fiscalYearStart }) => {
  const navigate = useNavigate();

  const startDate =
    fiscalYearStart !== "Inconnue" ? new Date(convertToISO(fiscalYearStart)) : null;

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getStepDate = (step: TimelineStep): string => {
    if (!startDate) return "Date inconnue";
    const date = step.getDate(startDate);
    return formatDate(date);
  };

  const handleAction = (action: string) => {
    if (action === "SIMULER") {
      navigate("/ppv-simulator");
    } else if (action === "GÉNÉRER LES DOCUMENTS") {
      navigate("/redac-documents");
    } else {
      console.log(`Action: ${action}`);
    }
  };

  return (
    <div className="w-full px-4 space-y-6">
      <div className="relative">
        <div className="absolute top-8 left-4 right-4 md:left-8 md:right-8 h-0.5 bg-gradient-to-r from-purple-500 to-purple-900"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {timelineSteps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-full transition-all duration-300 ease-in-out hover:scale-105"
            >
              <div className="z-10 w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-2">
                {step.icon}
              </div>
              <div className="text-center px-2">
                <h3 className="text-sm md:text-base font-semibold mb-1">
                  {step.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 mb-2 h-12 overflow-y-auto">
                  {step.description}
                </p>
                <p className="text-xs md:text-sm font-medium mb-2">
                  {getStepDate(step)}
                </p>
                <Button
                  onClick={() => handleAction(step.action)}
                  className="w-full text-xs py-1"
                  variant="outline"
                >
                  {step.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
