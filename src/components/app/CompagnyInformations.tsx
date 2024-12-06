import React, { useState, useEffect } from "react";
import { Building, UserPlus, CalendarDays, Calendar, Zap, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { saveToLocalStorage, getFromLocalStorage } from "@/services/localStorageService";

interface CompanyData {
  companySize: number | string; // Effectifs
  name: string; // Nom de l'entreprise
  siret: string; // SIRET
  creationDate: string; // Date de création
  fiscalYearStart: string; // Début exercice comptable
  revenue: string; // Chiffre d'affaires
}

interface CompagnyInformationsProps {
  companySize?: number;
  onFiscalYearStartChange?: (fiscalYearStart: string) => void;
}

const CompagnyInformations: React.FC<CompagnyInformationsProps> = ({
  companySize = 0,
  onFiscalYearStartChange,
}) => {
  const [siret, setSiret] = useState<string>("");
  const [companyData, setCompanyData] = useState<CompanyData>(() => {
    if (typeof window !== "undefined") {
      const storedData = getFromLocalStorage("companyData");
      return (
        storedData || {
          companySize,
          name: "Entreprise inconnue",
          siret: "123 456 789 00001",
          creationDate: "Inconnue",
          fiscalYearStart: "Inconnue",
          revenue: "Non renseigné",
        }
      );
    }
    return {
      companySize,
      name: "Entreprise inconnue",
      siret: "123 456 789 00001",
      creationDate: "Inconnue",
      fiscalYearStart: "Inconnue",
      revenue: "Non renseigné",
    };
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [isEditingRevenue, setIsEditingRevenue] = useState<boolean>(false);
  const [isEditingSize, setIsEditingSize] = useState<boolean>(false);
  const [newRevenue, setNewRevenue] = useState<string>(companyData.revenue);
  const [newSize, setNewSize] = useState<string>(companyData.companySize.toString());

  useEffect(() => {
    if (typeof window !== "undefined") {
      saveToLocalStorage("companyData", companyData);
    }
  }, [companyData]);

  const fetchCompanyData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://hook.eu2.make.com/f6x7e0iil8lffh1fmd9r7fiyf4seedtl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ siren: siret }),
      });

      const responseData = await response.json();
      setCompanyData({
        companySize: responseData.effectifs || "N/A",
        name: responseData.nom_entreprise || "Inconnue",
        siret: siret,
        creationDate: responseData.date_creation || "Inconnue",
        fiscalYearStart: responseData.debut_exercice_comptable || "Inconnue",
        revenue: responseData.chiffre_affaires || "Non renseigné",
      });

      if (onFiscalYearStartChange) {
        onFiscalYearStartChange(responseData.debut_exercice_comptable || "Inconnue");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
      alert("Une erreur est survenue lors de la récupération des données.");
    } finally {
      setLoading(false);
    }
  };

  const handleRevenueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setNewRevenue(value);
    }
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setNewSize(value);
    }
  };

  const handleSaveRevenue = () => {
    if (!newRevenue || isNaN(parseFloat(newRevenue))) {
      alert("Veuillez entrer un chiffre d'affaires valide.");
      return;
    }

    setCompanyData((prevData: CompanyData) => ({
      ...prevData,
      revenue: newRevenue,
    }));
    setIsEditingRevenue(false);
  };

  const handleSaveSize = () => {
    if (!newSize || isNaN(parseInt(newSize, 10))) {
      alert("Veuillez entrer un nombre d'employés valide.");
      return;
    }

    setCompanyData((prevData: CompanyData) => ({
      ...prevData,
      companySize: parseInt(newSize, 10),
    }));
    setIsEditingSize(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      if (isEditingRevenue) {
        handleSaveRevenue();
      } else if (isEditingSize) {
        handleSaveSize();
      }
    }
  };

  const items = [
    { icon: Building, title: "Entreprise", value: companyData.name, colorClass: "text-blue-500" },
    {
      icon: UserPlus,
      title: "Effectif",
      value: isEditingSize ? (
        <input
          type="number"
          value={newSize}
          onChange={handleSizeChange}
          onKeyDown={handleKeyPress}
          className="border p-1 rounded"
        />
      ) : (
        <>
          {companyData.companySize}{" "}
          <Edit className="cursor-pointer inline" onClick={() => setIsEditingSize(true)} />
        </>
      ),
      colorClass: "text-green-500",
    },
    { icon: CalendarDays, title: "Date de création", value: companyData.creationDate, colorClass: "text-gray-500" },
    {
      icon: Calendar,
      title: "Ancienneté",
      value:
        companyData.creationDate !== "Inconnue"
          ? `${new Date().getFullYear() - new Date(companyData.creationDate).getFullYear()} ans`
          : "Inconnue",
      colorClass: "text-indigo-500",
    },
    { icon: Calendar, title: "Début exercice comptable", value: companyData.fiscalYearStart, colorClass: "text-black" },
    {
      icon: Zap,
      title: "Chiffre d'affaires",
      value: isEditingRevenue ? (
        <input
          type="text"
          value={newRevenue}
          onChange={handleRevenueChange}
          onKeyDown={handleKeyPress}
          className="border p-1 rounded"
        />
      ) : (
        <>
          {companyData.revenue}{" "}
          <Edit className="cursor-pointer inline" onClick={() => setIsEditingRevenue(true)} />
        </>
      ),
      colorClass: "text-yellow-500",
    },
  ];

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
      <CardHeader>
        <CardTitle className="text-2xl text-purple-700 dark:text-purple-300">Mon entreprise</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Entrez un numéro de SIRET"
            value={siret}
            onChange={(e) => setSiret(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={fetchCompanyData}
            className={`mt-2 px-4 py-2 rounded ${loading || !siret ? "bg-gray-400 text-white cursor-not-allowed" : "bg-purple-600 text-white hover:bg-purple-700"}`}
            disabled={loading || !siret}
          >
            {loading ? "Chargement..." : "Rechercher"}
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm h-full"
            >
              {React.createElement(item.icon, { className: `h-10 w-10 ${item.colorClass} flex-shrink-0` })}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">{item.title}</h3>
                <p className={`text-sm ${item.colorClass}`}>{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompagnyInformations;
