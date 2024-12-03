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
    periodeApplication: '',
    dateLimiteVersement: '',
    lieuDateSignature: '',
    nomQualiteSignataire: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Charger le fichier template
      const response = await fetch('/template-interessement.txt');
      const templateText = await response.text();

      // Remplacer les placeholders par les données du formulaire
      let filledTemplate = templateText;
      for (const key in formData) {
        const placeholder = `{{${key}}}`;
        const value = formData[key] || 'N/A';
        filledTemplate = filledTemplate.split(placeholder).join(value); // Remplace tous les placeholders
      }

      // Générer un PDF avec jsPDF
      const doc = new jsPDF();
      const pageHeight = doc.internal.pageSize.height; // Hauteur de la page
      let y = 10; // Position de départ

      const lines = doc.splitTextToSize(filledTemplate, 180); // Découpe le texte pour s'adapter à la largeur

      lines.forEach((line: string) => {
        if (y + 10 > pageHeight) {
          doc.addPage(); // Ajouter une nouvelle page
          y = 10; // Réinitialiser la position en haut de la page
        }
        doc.text(line, 10, y);
        y += 10; // Passer à la ligne suivante
      });

      doc.save('Accord_Interessement.pdf'); // Télécharger le PDF
    } catch (error) {
      console.error('Erreur lors de la génération du document :', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nomEntreprise">Nom de l'entreprise</Label>
        <Input id="nomEntreprise" name="nomEntreprise" value={formData.nomEntreprise} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="adresse">Adresse complète</Label>
        <Input id="adresse" name="adresse" value={formData.adresse} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="siret">Numéro SIRET</Label>
        <Input id="siret" name="siret" value={formData.siret} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="idcc">Code IDCC de la convention collective applicable</Label>
        <Input id="idcc" name="idcc" value={formData.idcc} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="nombreSalaries">Nombre de salariés</Label>
        <Input id="nombreSalaries" name="nombreSalaries" type="number" value={formData.nombreSalaries} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="periodeApplication">Période d'application de l'accord</Label>
        <Input id="periodeApplication" name="periodeApplication" value={formData.periodeApplication} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="dateLimiteVersement">Date limite de versement de la prime</Label>
        <Input id="dateLimiteVersement" name="dateLimiteVersement" type="date" value={formData.dateLimiteVersement} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lieuDateSignature">Lieu et date de signature</Label>
        <Input id="lieuDateSignature" name="lieuDateSignature" value={formData.lieuDateSignature} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="nomQualiteSignataire">Nom et qualité du signataire</Label>
        <Input id="nomQualiteSignataire" name="nomQualiteSignataire" value={formData.nomQualiteSignataire} onChange={handleChange} required />
      </div>
      <Button type="submit" className="w-full">
        GÉNÉRER
      </Button>
    </form>
  );
}
