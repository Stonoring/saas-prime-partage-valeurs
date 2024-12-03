import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useSimulation } from '@/contexts/SimulationContext'
import { useNavigate } from 'react-router-dom'

export function Summary({ onPrev }: { onPrev: () => void }) {
  const { data } = useSimulation();
  const navigate = useNavigate();

  const montantTotal = data.totalAmount;
  const nombreBeneficiaires = data.employees;
  const primeParEmploye = montantTotal / nombreBeneficiaires;
  const coutTotal = primeParEmploye > 3000 && !data.hasIncentive
    ? montantTotal * 1.2  // 20% de charges supplémentaires
    : montantTotal;

  const recommendedMethod = primeParEmploye > 3000 ? "PPV avec intéressement" : "PPV classique";

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Votre simulation est prête !</CardTitle>
        <CardDescription>Voici un récapitulatif de votre simulation PPV.</CardDescription>
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
            <TableRow>
              <TableCell>Montant total de la prime</TableCell>
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
            {primeParEmploye > 3000 && !data.hasIncentive && (
              <TableRow>
                <TableCell>Coût total pour l&apos;entreprise</TableCell>
                <TableCell>{coutTotal.toFixed(2)} €</TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell>Mode de versement recommandé</TableCell>
              <TableCell>{recommendedMethod}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>Précédent</Button>
        <div className="space-x-2">
          <Button onClick={() => console.log('Télécharger le rapport')}>Télécharger le rapport</Button>
          <Button onClick={() => console.log('Recommencer')}>Recommencer</Button>
          <Button onClick={() => navigate('/')}>Retourner à l&apos;écran d&apos;accueil</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
