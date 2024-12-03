'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import { useSimulation } from '@/contexts/SimulationContext'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export function PrimeModeling({ onNext, onPrev }: { onNext: () => void, onPrev: () => void }) {
  const { data, updateData } = useSimulation();
  const [totalAmount, setTotalAmount] = useState(() => data.totalAmount || 3000 * data.employees)
  const [distributionCriteria, setDistributionCriteria] = useState(() => data.distributionCriteria)
  const [criteriaWeights, setCriteriaWeights] = useState(() => data.criteriaWeights)

  const maxExemptAmount = data.hasIncentive ? 6000 * data.employees : 3000 * data.employees
  const maxAmount = Math.max(maxExemptAmount, 6000 * data.employees)

  useEffect(() => {
    if (
      totalAmount !== data.totalAmount ||
      distributionCriteria !== data.distributionCriteria ||
      JSON.stringify(criteriaWeights) !== JSON.stringify(data.criteriaWeights)
    ) {
      updateData({
        totalAmount,
        distributionCriteria,
        criteriaWeights
      })
    }
  }, [totalAmount, distributionCriteria, criteriaWeights, data, updateData])

  const pieData = [
    { name: 'Ancienneté', value: criteriaWeights.seniority },
    { name: 'Classification', value: criteriaWeights.classification },
    { name: 'Temps de travail', value: criteriaWeights.workTime }
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Comment souhaitez-vous répartir votre prime ?</CardTitle>
        <CardDescription>Personnalisez la répartition selon vos besoins.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Montant total à distribuer : {totalAmount} €</Label>
          <Slider 
            min={0} 
            max={maxAmount} 
            step={100} 
            value={[totalAmount]}
            onValueChange={(value: number[]) => setTotalAmount(prev => value[0])}
          />
          <p className="text-sm text-muted-foreground">
            {totalAmount <= maxExemptAmount 
              ? `Montant exonéré jusqu'à ${maxExemptAmount}€` 
              : "Montant non exonéré"}
          </p>
        </div>
        <div className="space-y-2">
          <Label>Critères de répartition</Label>
          <RadioGroup 
            value={distributionCriteria} 
            onValueChange={(value: string) => setDistributionCriteria(value as "equal" | "weighted")}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="equal" id="equal" />
              <Label htmlFor="equal">Tous les salariés reçoivent le même montant</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="weighted" id="weighted" />
              <Label htmlFor="weighted">Répartition pondérée</Label>
            </div>
          </RadioGroup>
        </div>
        {distributionCriteria === 'weighted' && (
          <div className="space-y-4">
            <Label>Importance des critères</Label>
            <div className="space-y-2">
              <Label>Ancienneté : {criteriaWeights.seniority}%</Label>
              <Slider 
                value={[criteriaWeights.seniority]}
                onValueChange={(value: number[]) => setCriteriaWeights(prev => ({ ...prev, seniority: value[0] }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Classification/poste : {criteriaWeights.classification}%</Label>
              <Slider 
                value={[criteriaWeights.classification]}
                onValueChange={(value: number[]) => setCriteriaWeights(prev => ({ ...prev, classification: value[0] }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Temps de travail effectif : {criteriaWeights.workTime}%</Label>
              <Slider 
                value={[criteriaWeights.workTime]}
                onValueChange={(value: number[]) => setCriteriaWeights(prev => ({ ...prev, workTime: value[0] }))}
              />
            </div>
          </div>
        )}
        {distributionCriteria === 'weighted' && (
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
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>Précédent</Button>
        <Button onClick={onNext}>Suivant</Button>
      </CardFooter>
    </Card>
  )
}
