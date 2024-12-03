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
      const response = await fetch('/template-interessement.txt');
      const templateText = await response.text();

      let filledTemplate = templateText;
      for (const key in formData) {
        const placeholder = `{{${key}}}`;
        const value = formData[key] || 'N/A';
        filledTemplate = filledTemplate.split(placeholder).join(value);
      }

      const doc = new jsPDF();

      // Ajout du titre principal
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Accord d'intéressement", 105, 15, null, null, "center");

      // Informations générales (texte normal, titres en gras)
      doc.setFontSize(12);
      doc.setFont("Helvetica", "bold");
      doc.text("Informations Générales :", 10, 30);
      doc.setFont("Helvetica", "normal");
      doc.text(`Nom de l'entreprise : ${formData.nomEntreprise}`, 10, 40);
      doc.text(`Adresse : ${formData.adresse}`, 10, 50);
      doc.text(`SIRET : ${formData.siret}`, 10, 60);
      doc.text(`IDCC : ${formData.idcc}`, 10, 70);
      doc.text(`Nombre de salariés : ${formData.nombreSalaries}`, 10, 80);
      doc.text(`Période d'application : ${formData.periodeApplication}`, 10, 90);
      doc.text(`Date limite de versement : ${formData.dateLimiteVersement}`, 10, 100);

      // Découpe et segmentation du texte principal
      let y = 110; // Position initiale après les informations générales
      const pageWidth = doc.internal.pageSize.width;
      const margin = 10;
      const usableWidth = pageWidth - margin * 2;

      doc.setFontSize(10);
      const sections = filledTemplate.split("\n\n"); // Segmentation par paragraphes
      sections.forEach((section, index) => {
        if (index === 0) {
          doc.setFont("Helvetica", "bold");
        } else {
          doc.setFont("Helvetica", "normal");
        }

        const lines = doc.splitTextToSize(section, usableWidth);
        lines.forEach((line: string) => {
          if (y + 10 > doc.internal.pageSize.height - 20) {
            doc.addPage();
            y = 20;
          }
          doc.text(line, margin, y);
          y += 8;
        });
        y += 5; // Espacement entre paragraphes
      });

      // Pied de page avec pagination
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.text(`Page ${i} sur ${pageCount}`, pageWidth / 2, doc.internal.pageSize.height - 10, null, null, "center");
      }

      doc.save('Accord_Interessement.pdf');
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
