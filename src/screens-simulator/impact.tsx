'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Données simplifiées pour une meilleure lisibilité du graphique
const chartData = [
  { 
    name: 'Prime\nclassique', 
    cout: 3000, 
    net: 2340
  },
  { 
    name: 'PPV sans\nintéressement', 
    cout: 3000, 
    net: 3000
  },
  { 
    name: 'PPV avec\nintéressement', 
    cout: 6000, 
    net: 6000
  },
  { 
    name: 'PPV sans\nintéressement\n(mixte)', 
    cout: 6000, 
    net: 5340
  },
];

// Données complètes pour le tableau
const tableData = [
  { 
    name: 'Prime classique', 
    cost: 3000, 
    netAmount: 2340,
    taxExemption: 'Non' 
  },
  { 
    name: 'PPV sans intéressement (3000 exonérés)', 
    cost: 3000, 
    netAmount: 3000,
    taxExemption: 'Oui (exonérée mais imposable)'
  },
  { 
    name: 'PPV avec intéressement (6000 €)', 
    cost: 6000, 
    netAmount: 6000,
    taxExemption: 'Oui (totalement exonérée)'
  },
  { 
    name: 'PPV sans intéressement (3000 exonérés + 3000 imposables)', 
    cost: 6000, 
    netAmount: 5340,
    taxExemption: 'Partielle (3000 € exonérés, 3000 € soumis)'
  },
];

interface ImpactProps {
  onNext: () => void;
  onPrev: () => void;
}

export function Impact({ onNext, onPrev }: ImpactProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Quel sera l'impact de vos choix ?</CardTitle>
        <CardDescription>Comparez les options pour optimiser vos coûts et maximiser les bénéfices pour vos salariés.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Mode de versement</TableHead>
              <TableHead>Coût total</TableHead>
              <TableHead>Montant net reçu</TableHead>
              <TableHead className="w-[30%]">Exonération fiscale et sociale</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.cost} €</TableCell>
                <TableCell>{row.netAmount} €</TableCell>
                <TableCell>{row.taxExemption}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="h-[400px] w-full mt-8">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={0}
                interval={0}
                tick={{ fontSize: 12 }}
                height={80}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cout" name="Coût total" fill="#8884d8" />
              <Bar dataKey="net" name="Montant net reçu" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>Précédent</Button>
        <Button onClick={onNext}>Suivant</Button>
      </CardFooter>
    </Card>
  );
}

