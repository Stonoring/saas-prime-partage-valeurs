'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useSimulation } from '@/contexts/SimulationContext';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

type DistributionCriteria = 'equal' | 'weighted';
type Criteria = 'seniority' | 'classification' | 'workTime';

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

export function PrimeModeling({ onNext, onPrev }: Props) {
  const { data, updateData } = useSimulation();

  // États locaux
  const [totalAmount, setTotalAmount] = useState<number>(
    data.totalAmount || 3000 * data.employees
  );
  const [distributionCriteria, setDistributionCriteria] = useState<DistributionCriteria>(
    data.distributionCriteria || 'equal'
  );
  const [selectedCriteria, setSelectedCriteria] = useState<Criteria[]>([]);
  const [criteriaWeights, setCriteriaWeights] = useState<Record<Criteria, number>>({
    seniority: 0,
    classification: 0,
    workTime: 0,
  });
  const [error, setError] = useState<string | null>(null);

  // Calculs
  const maxExemptAmount = data.hasIncentive
    ? 6000 * data.employees
    : 3000 * data.employees;
  const maxAmount = Math.max(maxExemptAmount, 6000 * data.employees);

  const updateWeight = (key: Criteria, value: number) => {
    const otherTotal = Object.entries(criteriaWeights).reduce(
      (sum, [k, v]) => (k !== key ? sum + v : sum),
      0
    );
    if (otherTotal + value <= 100) {
      setCriteriaWeights((prev) => ({ ...prev, [key]: value }));
      setError(null);
    } else {
      setError('La somme des pourcentages ne peut pas dépasser 100 %.');
    }
  };

  const handleNext = () => {
    updateData({
      totalAmount,
      distributionCriteria,
      criteriaWeights,
    });
    onNext();
  };

  const pieData = selectedCriteria.map((criteria) => ({
    name:
      criteria === 'seniority'
        ? 'Ancienneté'
        : criteria === 'classification'
        ? 'Classification'
        : 'Temps de travail',
    value: criteriaWeights[criteria] || 0,
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Comment souhaitez-vous répartir votre prime&nbsp;?
        </CardTitle>
        <CardDescription>
          Personnalisez la répartition selon vos besoins.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Montant total à distribuer */}
        <div className="space-y-2">
          <Label>Montant total à distribuer :</Label>
          <div className="flex items-center space-x-4">
            <Slider
              min={0}
              max={maxAmount}
              step={100}
              value={[totalAmount]}
              onValueChange={(value) => setTotalAmount(value[0])}
            />
            <input
              type="number"
              className="border p-2 w-24"
              value={totalAmount}
              onChange={(e) =>
                setTotalAmount(
                  Math.min(
                    maxAmount,
                    Math.max(0, parseInt(e.target.value) || 0)
                  )
                )
              }
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {totalAmount <= maxExemptAmount
              ? `Montant exonéré jusqu'à ${maxExemptAmount.toLocaleString(
                  'fr-FR'
                )} €`
              : 'Montant non exonéré'}
          </p>
        </div>

        {/* Critères de répartition */}
        <div className="space-y-2">
          <Label>Critères de répartition</Label>
          <RadioGroup
            value={distributionCriteria}
            onValueChange={(value: DistributionCriteria) =>
              setDistributionCriteria(value)
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="equal" id="equal" />
              <Label htmlFor="equal">
                Tous les salariés reçoivent le même montant
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="weighted" id="weighted" />
              <Label htmlFor="weighted">Répartition pondérée</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Répartition pondérée */}
        {distributionCriteria === 'weighted' && (
          <>
            {/* Sélection des critères */}
            <div className="space-y-2">
              <Label>Sélectionnez les critères à utiliser :</Label>
              <div className="flex flex-wrap gap-2">
                {(['seniority', 'classification', 'workTime'] as Criteria[]).map(
                  (criteria) => (
                    <Button
                      key={criteria}
                      variant={
                        selectedCriteria.includes(criteria)
                          ? 'default'
                          : 'outline'
                      }
                      onClick={() =>
                        setSelectedCriteria((prev) =>
                          prev.includes(criteria)
                            ? prev.filter((c) => c !== criteria)
                            : [...prev, criteria]
                        )
                      }
                    >
                      {criteria === 'seniority'
                        ? 'Ancienneté'
                        : criteria === 'classification'
                        ? 'Classification'
                        : 'Temps de travail'}
                    </Button>
                  )
                )}
              </div>
            </div>

            {/* Pondération des critères */}
            {selectedCriteria.length > 0 && (
              <div className="space-y-4">
                <Label>
                  Importance des critères (doit totaliser 100&nbsp;%)
                </Label>
                {selectedCriteria.map((criteria) => (
                  <div key={criteria} className="space-y-2">
                    <Label>
                      {criteria === 'seniority'
                        ? 'Ancienneté'
                        : criteria === 'classification'
                        ? 'Classification'
                        : 'Temps de travail'}{' '}
                      : {criteriaWeights[criteria]}%
                    </Label>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[criteriaWeights[criteria]]}
                      onValueChange={(value) =>
                        updateWeight(criteria, value[0])
                      }
                    />
                  </div>
                ))}
                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}
              </div>
            )}
          </>
        )}

        {/* Graphique en secteurs */}
        {distributionCriteria === 'weighted' &&
          selectedCriteria.length > 0 && (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          Précédent
        </Button>
        <Button onClick={handleNext}>Suivant</Button>
      </CardFooter>
    </Card>
  );
}
