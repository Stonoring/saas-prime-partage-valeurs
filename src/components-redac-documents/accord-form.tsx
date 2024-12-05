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
    nomQualiteSignataire: '',
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
    return initialDate.toISOString().split('T')[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/template-interessement.txt');
      const templateText = await response.text();

      const todayDate = new Date().toLocaleDateString('fr-FR');

      const updatedFormData: Record<string, string> = {
        ...formData,
        Date: todayDate,
        periodeApplication: formData.exercicesRetenus,
        dateLimiteVersement: calculateClotureDate(formData.dateClotureExercice),
      };

      // Remplacement des placeholders
      let filledTemplate = templateText;
      for (const key in updatedFormData) {
        const placeholder = `{{${key}}}`;
        const value = updatedFormData[key] || 'N/A';
        filledTemplate = filledTemplate.replaceAll(placeholder, value);
      }

      const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });

      // Définitions pour les marges et les dimensions de page
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginLeft = 20;
      const marginRight = 20;
      const marginTop = 20;
      const marginBottom = 20;
      const usablePageWidth = pageWidth - marginLeft - marginRight;

      let currentHeight = marginTop;

      // Fonction pour ajouter la pagination
      const addPagination = () => {
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.setFontSize(10);
          doc.text(
            `Page ${i} sur ${pageCount}`,
            pageWidth / 2,
            pageHeight - 10,
            { align: 'center' }
          );
        }
      };

      // Titre principal
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(18);
      doc.text('Accord d\'intéressement', pageWidth / 2, currentHeight, { align: 'center' });

      currentHeight += 15;

      // Ajout du contenu de la template
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(12);
      const lines = doc.splitTextToSize(filledTemplate, usablePageWidth);

      const lineHeight = 7;

      lines.forEach((line: string) => {
        if (currentHeight + lineHeight > pageHeight - marginBottom) {
          doc.addPage();
          currentHeight = marginTop;
        }
        doc.text(line, marginLeft, currentHeight);
        currentHeight += lineHeight;
      });

      currentHeight += 20;

      // Signature
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('Pour l\'entreprise :', marginLeft, currentHeight);
      currentHeight += 10;
      doc.text(`${formData.nomQualiteSignataire}`, marginLeft, currentHeight);

      // Ajouter la pagination
      addPagination();

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
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="siret">Numéro SIRET</Label>
        <Input
          id="siret"
          name="siret"
          value={formData.siret}
          onChange={handleChange}
          placeholder="123 456 789 00000"
          required
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
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="nomQualiteSignataire">Nom et qualité du signataire</Label>
        <Input
          id="nomQualiteSignataire"
          name="nomQualiteSignataire"
          value={formData.nomQualiteSignataire}
          onChange={handleChange}
          placeholder="Directeur Général"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        GÉNÉRER
      </Button>
    </form>
  );
}
