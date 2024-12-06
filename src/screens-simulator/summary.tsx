'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useSimulation } from '@/contexts/SimulationContext';
import { useRouter } from 'next/navigation'; // Utilisation de next/navigation pour la navigation moderne
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function Summary({ onPrev }: { onPrev: () => void }) {
  const { data } = useSimulation();
  const router = useRouter(); // Hook pour la navigation

  // Calculs
  const montantTotal = data.totalAmount || 0;
  const nombreBeneficiaires = data.employees || 1;
  const primeParEmploye = montantTotal / nombreBeneficiaires;
  const coutTotal =
    primeParEmploye > 3000 && !data.hasIncentive ? montantTotal * 1.2 : montantTotal;
  const recommendedMethod = primeParEmploye > 3000 ? 'PPV avec intéressement' : 'PPV classique';

  // Critères de répartition pondérée
  const weightedCriteria = React.useMemo(() => {
    return Object.entries(data.criteriaWeights || {}).map(([key, value]) => ({
      name:
        key === 'seniority'
          ? 'Ancienneté'
          : key === 'classification'
          ? 'Classification'
          : 'Temps de travail',
      weight: value,
    }));
  }, [data.criteriaWeights]);

  // Fonction pour générer et télécharger le PDF
  const downloadPDF = async () => {
    const element = document.getElementById('pdf-report');
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, pdfHeight - 20);
    pdf.save('Rapport_PP.pdf');
  };

  return (
    <div>
      <Card className="w-full" id="pdf-report">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Votre simulation est prête&nbsp;!</CardTitle>
          <CardDescription>Voici un récapitulatif détaillé de votre simulation PPV.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tableau récapitulatif */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Élément</TableHead>
                <TableHead>Valeur</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Montant total</TableCell>
                <TableCell>{montantTotal.toFixed(2)} €</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Nombre de bénéficiaires</TableCell>
                <TableCell>{nombreBeneficiaires}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Prime par employé</TableCell>
                <TableCell>{primeParEmploye.toFixed(2)} €</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Coût total</TableCell>
                <TableCell>{coutTotal.toFixed(2)} €</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Méthode recommandée</TableCell>
                <TableCell>{recommendedMethod}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CardFooter className="flex justify-between mt-4 space-x-4">
        <Button variant="outline" onClick={onPrev}>
          Précédent
        </Button>
        <Button onClick={downloadPDF}>Télécharger le rapport</Button>
        <Button onClick={() => router.push('/ppv-simulator')}>Recommencer</Button>
        <Button onClick={() => router.push('/')}>Retourner à l&apos;accueil</Button>
      </CardFooter>
    </div>
  );
}
