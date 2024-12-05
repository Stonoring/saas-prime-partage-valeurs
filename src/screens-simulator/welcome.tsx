'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export function Welcome({ onNext }: { onNext: () => void }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Simulez votre prime PPV en 5 étapes simples</CardTitle>
        <CardDescription>Découvrez comment optimiser la Prime de Partage de la Valeur pour votre entreprise</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-4">
          Notre simulateur vous guidera à travers le processus de calcul et d'optimisation de votre Prime de Partage de la Valeur.
          Vous pourrez vérifier votre éligibilité, simuler différents scénarios et obtenir des recommandations personnalisées.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => window.open('#', '_blank')}>
          En savoir plus sur la prime PPV
        </Button>
        <Button onClick={onNext}>Commencer la simulation</Button>
      </CardFooter>
    </Card>
  );
}
