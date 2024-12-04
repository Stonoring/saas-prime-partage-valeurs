'use client';

import { useState } from 'react';
import jsPDF from 'jspdf';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form/input";
import { Label } from "@/components/ui/label";

export default function AccordForm() {
  const [formData, setFormData] = useState<Record<string, string>>({
    nomEntreprise: '',
    adresse: '',
    siret: '',
    idcc: '',
    nombreSalaries: '',
    exercicesRetenus: '',
    dateClotureExercice: '',
    lieu: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const calculateClotureDate = (date: string) => {
    const initialDate = new Date(date);
    initialDate.setMonth(initialDate.getMonth() + 5); // Ajoute 5 mois
    return initialDate.toISOString().split('T')[0]; // Formate en yyyy-mm-dd
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/template-interessement.txt');
      const templateText = await response.text();

      const todayDate = new Date().toLocaleDateString('fr-FR'); // Date du jour (format FR)

      const updatedFormData: Record<string, string> = {
        ...formData,
        Date: todayDate,
      };

      let filledTemplate = templateText;

      for (const key in updatedFormData) {
        const placeholder = `{{${key}}}`;
        const value = updatedFormData[key] || 'N/A';
        filledTemplate = filledTemplate.split(placeholder).join(value);
      }

      const doc = new jsPDF();

      // Ajout du contenu PDF
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Accord d'intéressement", 105, 15, null, null, "center");

      doc.setFontSize(12);
      doc.setFont("Helvetica", "bold");
      doc.text("Informations Générales :", 10, 30);
      doc.setFont("Helvetica", "normal");
      doc.text(`Nom de l'entreprise : ${formData.nomEntreprise}`, 10, 40);
      doc.text(`Adresse : ${formData.adresse}`, 10, 50);
      doc.text(`SIRET : ${formData.siret}`, 10, 60);
      doc.text(`IDCC : ${formData.idcc}`, 10, 70);
      doc.text(`Nombre de salariés : ${formData.nombreSalaries}`, 10, 80);
      doc.text(`Exercices retenus : ${formData.exercicesRetenus}`, 10, 90);
      doc.text(`Date de clôture de l'exercice : ${calculateClotureDate(formData.dateClotureExercice)}`, 10, 100);
      doc.text(`Fait à : ${formData.lieu}`, 10, 110);
      doc.text(`Le : ${todayDate}`, 10, 120);

      doc.save('Accord_Interessement.pdf');
    } catch (error) {
      console.error('Erreur lors de la génération du document :', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nomEntreprise">Nom de l'entreprise</Label>
        <Input
          id="nomEntreprise"
          name="nomEntreprise"
          value={formData.nomEntreprise}
          onChange={handleChange}
          placeholder="Finopia SAS"
          required
          className="h-8"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="adresse">Adresse complète</Label>
        <Input
          id="adresse"
          name="adresse"
          value={formData.adresse}
          onChange={handleChange}
          placeholder="12 rue des exemples, 75000 Paris"
          required
          className="h-8"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="siret">Numéro SIRET</Label>
        <Input
          id="siret"
          name="siret"
          value={formData.siret}
          onChange={handleChange}
          placeholder="12345678900000"
          required
          className="h-8"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="idcc">Code IDCC de la convention collective applicable</Label>
        <Input
          id="idcc"
          name="idcc"
          value={formData.idcc}
          onChange={handleChange}
          placeholder="1234"
          required
          className="h-8"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="nombreSalaries">Nombre de salariés</Label>
        <Input
          id="nombreSalaries"
          name="nombreSalaries"
          type="number"
          value={formData.nombreSalaries}
          onChange={handleChange}
          placeholder="50"
          required
          className="h-8"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="exercicesRetenus">Exercices retenus</Label>
        <Input
          id="exercicesRetenus"
          name="exercicesRetenus"
          value={formData.exercicesRetenus}
          onChange={handleChange}
          placeholder="16/06/2023 – 15/06/2024"
          required
          className="h-8"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="dateClotureExercice">Date de clôture de l'exercice</Label>
        <Input
          id="dateClotureExercice"
          name="dateClotureExercice"
          type="date"
          value={formData.dateClotureExercice}
          onChange={handleChange}
          required
          className="h-8"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lieu">Fait à :</Label>
        <Input
          id="lieu"
          name="lieu"
          value={formData.lieu}
          onChange={handleChange}
          placeholder="Paris"
          required
          className="h-8"
        />
      </div>
      <Button type="submit" className="w-full">
        GÉNÉRER
      </Button>
    </form>
  );
}
