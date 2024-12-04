import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSimulation } from '@/contexts/SimulationContext';
import { useNavigate } from 'react-router-dom';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const Summary = React.memo(function Summary({ onPrev }: { onPrev: () => void }) {
  const { data } = useSimulation();
  const navigate = useNavigate();

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
      name: key === 'seniority' ? 'Ancienneté' : key === 'classification' ? 'Classification' : 'Temps de travail',
      weight: value,
    }));
  }, [data.criteriaWeights]);

  // Fonction pour générer et télécharger le PDF
  const downloadPDF = async () => {
    const element = document.getElementById("pdf-report");
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, pdfWidth - 20, pdfHeight - 20);
    pdf.save("Rapport_PP.pdf");
  };

  return (
    <div>
      <Card className="w-full" id="pdf-report">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Votre simulation est prête !</CardTitle>
          <CardDescription>Voici un récapitulatif détaillé de votre simulation PPV.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Élément</TableHead>
                <TableHead>Valeur</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Objectifs de l'employeur */}
              {data.selectedNeeds && data.selectedNeeds.length > 0 && (
                <TableRow>
                  <TableCell>Objectifs de la prime</TableCell>
                  <TableCell>
                    {data.selectedNeeds.map((need) => need.label).join(', ')}
                  </TableCell>
                </TableRow>
              )}
              {data.otherNeed && (
                <TableRow>
                  <TableCell>Autre besoin spécifié</TableCell>
                  <TableCell>{data.otherNeed}</TableCell>
                </TableRow>
              )}

              {/* Informations sur l'entreprise */}
              <TableRow>
                <TableCell>Nombre de salariés</TableCell>
                <TableCell>{data.employees}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Moyenne des bénéfices des 3 dernières années</TableCell>
                <TableCell>{data.profits.toLocaleString('fr-FR')} €</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Dispositif d'intéressement existant</TableCell>
                <TableCell>{data.hasIncentive ? "Oui" : "Non"}</TableCell>
              </TableRow>

              {/* Données sur la prime */}
              <TableRow>
                <TableCell>Montant total de la prime</TableCell>
                <TableCell>{montantTotal.toLocaleString('fr-FR')} €</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Prime par employé</TableCell>
                <TableCell>{primeParEmploye.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €</TableCell>
              </TableRow>
              {primeParEmploye > 3000 && !data.hasIncentive && (
                <TableRow>
                  <TableCell>Coût total pour l'entreprise (charges incluses)</TableCell>
                  <TableCell>{coutTotal.toLocaleString('fr-FR')} €</TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell>Mode de versement recommandé</TableCell>
                <TableCell>{recommendedMethod}</TableCell>
              </TableRow>

              {/* Critères de répartition */}
              {data.distributionCriteria === 'weighted' && weightedCriteria.length > 0 && (
                <>
                  <TableRow>
                    <TableCell colSpan={2} className="font-bold">Critères de répartition pondérée</TableCell>
                  </TableRow>
                  {weightedCriteria.map((criteria) => (
                    <TableRow key={criteria.name}>
                      <TableCell>{criteria.name}</TableCell>
                      <TableCell>{criteria.weight}%</TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CardFooter className="flex justify-between mt-4 space-x-4">
        <Button variant="outline" onClick={onPrev}>
          Précédent
        </Button>
        <Button onClick={downloadPDF}>Télécharger le rapport</Button>
        <Button onClick={() => navigate('/welcome')}>Recommencer</Button>
        <Button onClick={() => navigate('/')}>Retourner à l&apos;écran d&apos;accueil</Button>
      </CardFooter>
    </div>
  );
});
