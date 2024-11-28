import React, { useState } from "react";
import { Building, UserPlus, CalendarDays, Calendar, Zap, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CompagnyInformationsProps {
  companySize?: number;
}

const CompagnyInformations: React.FC<CompagnyInformationsProps> = ({ companySize = 0 }) => {
  const [siret, setSiret] = useState<string>(""); // Stocker le SIRET saisi par l'utilisateur
  const [companyData, setCompanyData] = useState<any>({
    companySize,
    name: "Entreprise inconnue",
    siret: "123 456 789 00001",
    creationDate: "Inconnue",
    fiscalYearStart: "Inconnue",
    revenue: "Non renseigné",
    years: "N/A",
  });
  const [loading, setLoading] = useState<boolean>(false); // Gérer l'indicateur de chargement

  // Fonction pour récupérer les données via le webhook Make
  const fetchCompanyData = async () => {
    console.log("Bouton cliqué ! Tentative de récupération des données...");
    console.log("Valeur du SIRET : ", siret);
    setLoading(true);
    try {
      console.log("Envoi de la requête au webhook...");
      const response = await fetch("https://hook.eu2.make.com/f6x7e0iil8lffh1fmd9r7fiyf4seedtl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ siren: siret }),
      });

      console.log("Statut HTTP de la réponse : ", response.status);

      // Vérifiez si la réponse est JSON
      const contentType = response.headers.get("Content-Type");
      console.log("Type de contenu de la réponse :", contentType);

      if (!contentType || !contentType.includes("application/json")) {
        const rawResponse = await response.text();
        console.error("Réponse non JSON reçue :", rawResponse);
        throw new Error(`Réponse non JSON : ${rawResponse}`);
      }

      const responseData = await response.json();
      console.log("Réponse JSON reçue :", responseData);

      // Mettre à jour les données dans le composant
      setCompanyData({
        companySize: responseData.effectifs || "N/A",
        name: responseData.nom_entreprise || "Inconnue",
        siret: siret,
        creationDate: responseData.date_creation || "Inconnue",
        fiscalYearStart: responseData.debut_exercice_comptable || "Inconnue",
        revenue: responseData.chiffre_affaires || "Non renseigné",
        years: `${responseData.annees_existence || "N/A"} ans`,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erreur lors de la récupération des données via le webhook :", error.message);
        alert(`Une erreur est survenue : ${error.message}`);
      } else {
        console.error("Erreur inconnue :", error);
        alert("Une erreur inconnue est survenue.");
      }
    } finally {
      console.log("Requête terminée.");
      setLoading(false);
    }
  };

  const items = [
    { icon: Building, title: "Entreprise", value: `${companyData.name}`, colorClass: "text-blue-500" },
    { icon: UserPlus, title: "Effectif", value: `${companyData.companySize}`, colorClass: "text-green-500" },
    { icon: CalendarDays, title: "Date de création", value: companyData.creationDate, colorClass: "text-gray-500" },
    { icon: Calendar, title: "Début exercice comptable", value: companyData.fiscalYearStart, colorClass: "text-black" },
    { icon: Zap, title: "Chiffre d'affaires", value: companyData.revenue, colorClass: "text-yellow-500" },
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
            className={`mt-2 px-4 py-2 rounded ${
              loading || !siret
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
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