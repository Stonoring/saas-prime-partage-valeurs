'use client';

import React, { useState } from "react";
import { Input } from "@/components/ui/form/input";
import { Search, Loader2 } from "lucide-react";

const ChatbotInput: React.FC = () => {
  const [userInput, setUserInput] = useState<string>(""); // Entrée utilisateur
  const [response, setResponse] = useState<string>(""); // Réponse brute du chatbot
  const [formattedResponse, setFormattedResponse] = useState<JSX.Element | null>(null); // Réponse formatée
  const [isLoading, setIsLoading] = useState<boolean>(false); // Indicateur de chargement

  // Gérer les changements dans le champ d'entrée
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  // Gérer et formater la réponse
  const formatResponse = (text: string): JSX.Element => {
    // Suppression des [x]
    const cleanedText = text.replace(/\[.*?\]/g, "");

    // Division des lignes pour gérer les retours à la ligne
    const lines = cleanedText.split("\n").map((line, index) => {
      // Format des titres avec ##
      if (line.trim().startsWith("##")) {
        return (
          <p key={index} className="mt-6 font-bold text-lg">
            {line.replace("##", "").trim()}
          </p>
        );
      }

      // Mise en gras pour *x* ou #x#
      if (line.match(/(\*.*?\*|#.*?#)/)) {
        return (
          <p key={index} className="mt-4 font-bold">
            {line.replace(/[*#]/g, "").trim()}
          </p>
        );
      }

      // Si la ligne commence par un "-"
      if (line.trim().startsWith("-")) {
        return (
          <li key={index} className="list-disc ml-6 mt-2">
            {line.replace("-", "").trim()}
          </li>
        );
      }

      // Texte normal
      return <p key={index} className="mt-2">{line.trim()}</p>;
    });

    return <div>{lines}</div>;
  };

  // Gérer l'envoi de la question au webhook
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault(); // Empêche la soumission par défaut du formulaire
    if (!userInput.trim()) return; // Empêche l'envoi d'une entrée vide

    setIsLoading(true); // Active l'état de chargement
    setResponse(""); // Réinitialise la réponse avant chaque requête
    setFormattedResponse(null);

    try {
      const res = await fetch("https://hook.eu2.make.com/b013stkkhf4yti53u4lffrhblwzvn45r", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userInput }),
      });

      if (!res.ok) {
        setResponse("Erreur lors de la communication avec le serveur.");
        setFormattedResponse(formatResponse("Erreur lors de la communication avec le serveur."));
        return;
      }

      const data = await res.json(); // Parse la réponse JSON

      setResponse(data.response || "Pas de réponse trouvée.");
      setFormattedResponse(formatResponse(data.response || "Pas de réponse trouvée."));
    } catch (error) {
      setResponse("Une erreur s'est produite. Veuillez réessayer.");
      setFormattedResponse(formatResponse("Une erreur s'est produite. Veuillez réessayer."));
    } finally {
      setIsLoading(false); // Désactive l'état de chargement
      setUserInput(""); // Réinitialise le champ d'entrée
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Conteneur de la réponse */}
      <div className="flex-grow p-4 bg-gray-100 overflow-y-auto">
        {formattedResponse ? (
          <div className="bg-secondary text-secondary-foreground p-3 rounded-lg max-w-md">
            {formattedResponse}
          </div>
        ) : (
          <p className="text-gray-400">Votre réponse s'affichera ici...</p>
        )}
      </div>

      {/* Zone d'entrée utilisateur */}
      <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
        <div className="flex items-center rounded-md border border-gray-300 bg-gray-50">
          <Input
            type="text"
            placeholder="Posez votre question..."
            value={userInput}
            onChange={handleChange}
            className="flex-grow border-none h-10 bg-transparent focus:outline-none px-3"
          />
          <button
            type="submit"
            className="p-2 flex items-center justify-center bg-transparent focus:outline-none"
            aria-label="Rechercher"
            disabled={isLoading} // Désactiver le bouton pendant le chargement
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-gray-500" /> // Animation de chargement
            ) : (
              <Search className="h-5 w-5 text-gray-500" /> // Icône de loupe
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatbotInput;
