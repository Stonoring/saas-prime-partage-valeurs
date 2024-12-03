import React, { useState } from "react";
import { Building, UserPlus, CalendarDays, Calendar, Zap, Clock, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Définition du type pour les données de l'entreprise
interface CompanyData {
  companySize: number | string;
  name: string;
  siret: string;
  creationDate: string;
  fiscalYearStart: string;
  revenue: string;
  years: string;
}

interface CompagnyInformationsProps {
  companySize?: number;
  onFiscalYearStartChange?: (fiscalYearStart: string) => void; // Ajout de la prop facultative
}

const CompagnyInformations: React.FC<CompagnyInformationsProps> = ({ companySize = 0, onFiscalYearStartChange }) => {
  const [siret, setSiret] = useState<string>(""); // Stocker le SIRET saisi par l'utilisateur
  const [companyData, setCompanyData] = useState<CompanyData>({
    companySize,
    name: "Entreprise inconnue",
    siret: "123 456 789 00001",
    creationDate: "Inconnue",
    fiscalYearStart: "Inconnue",
    revenue: "Non renseigné",
    years: "N/A",
  });
  const [loading, setLoading] = useState<boolean>(false); // Gérer l'indicateur de chargement
  const [isEditingRevenue, setIsEditingRevenue] = useState<boolean>(false); // Gérer l'édition du chiffre d'affaires
  const [isEditingSize, setIsEditingSize] = useState<boolean>(false); // Gérer l'édition des effectifs
  const [newRevenue, setNewRevenue] = useState<string>(companyData.revenue); // Chiffre d'affaires à modifier
  const [newSize, setNewSize] = useState<string>(companyData.companySize.toString()); // Effectif à modifier

  // Fonction pour récupérer les données via le webhook Make
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
        years: `${responseData.annees_existence || "N/A"} ans`,
      });

      // Passer la date de début d'exercice comptable au parent si la prop est définie
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
    setNewRevenue(event.target.value);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewSize(event.target.value);
  };

  const handleSaveRevenue = () => {
    setCompanyData((prevData: CompanyData) => ({
      ...prevData,
      revenue: newRevenue,
    }));
    setIsEditingRevenue(false);
  };

  const handleSaveSize = () => {
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
    { icon: Building, title: "Entreprise", value: `${companyData.name}`, colorClass: "text-blue-500" },
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
    { icon: Clock, title: "Années d'existence", value: companyData.years, colorClass: "text-indigo-500" },
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSiret(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={fetchCompanyData}
            className={`mt-2 px-4 py-2 rounded ${loading || !siret ? "bg-gray-400 text-white cursor-not-allowed" : "bg-purple-600 text-white hover:bg-purple-700"}`}
            disabled={loading || !siret} // Désactiver si en cours de chargement ou si SIRET vide
          >
            {loading ? "Chargement..." : "Rechercher"}
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm h-full">
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
