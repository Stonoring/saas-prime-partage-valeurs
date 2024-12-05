'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useSimulation } from '@/contexts/SimulationContext';
import { useRouter } from 'next/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function Summary({ onPrev }: { onPrev: () => void }) {
  const { data } = useSimulation();
  const router = useRouter();

  // Calculs
  const montantTotal = data.totalAmount;
  const nombreBeneficiaires = data.employees;
  const primeParEmploye = montantTotal / nombreBeneficiaires;
  const coutTotal = primeParEmploye > 3000 && !data.hasIncentive
    ? montantTotal * 1.2 // 20% de charges supplémentaires
    : montantTotal;
  const recommendedMethod = primeParEmploye > 3000 ? "PPV avec intéressement" : "PPV classique";

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
              {/* Vos lignes de tableau ici */}
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
        <Button onClick={() => router.push('/')}>Retourner à l'écran d'accueil</Button>
      </CardFooter>
    </div>
  );
}
