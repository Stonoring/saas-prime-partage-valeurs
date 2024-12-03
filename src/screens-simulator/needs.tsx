import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/form/input"
import { Label } from "@/components/ui/label"

const needs = [
  { id: 'redistribute', label: 'Redistribuer les bénéfices aux salariés' },
  { id: 'increase', label: 'Augmenter le pouvoir d\'achat' },
  { id: 'reward', label: 'Récompenser des performances collectives' },
] as const;

type Need = (typeof needs)[number]; // Type for each element in 'needs'

export function Needs({ onNext, onPrev }: { onNext: () => void, onPrev: () => void }) {
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([])
  const [otherNeed, setOtherNeed] = useState('')

  const handleNeedToggle = (needId: string) => {
    setSelectedNeeds(prev => 
      prev.includes(needId) 
        ? prev.filter(id => id !== needId)
        : [...prev, needId]
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Pourquoi souhaitez-vous verser cette prime ?</CardTitle>
        <CardDescription>Choisissez les objectifs qui correspondent le mieux à votre entreprise.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {needs.map(need => (
            <div key={need.id} className="flex items-center space-x-2">
              <Checkbox 
                id={need.id} 
                checked={selectedNeeds.includes(need.id)}
                onCheckedChange={() => handleNeedToggle(need.id)}
              />
              <Label htmlFor={need.id}>{need.label}</Label>
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="other" 
              checked={selectedNeeds.includes('other')}
              onCheckedChange={() => handleNeedToggle('other')}
            />
            <Label htmlFor="other">Autre</Label>
          </div>
          {selectedNeeds.includes('other') && (
            <Input 
              placeholder="Précisez votre besoin" 
              value={otherNeed} 
              onChange={(e) => setOtherNeed(e.target.value)}
            />
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>Précédent</Button>
        <Button onClick={onNext}>Suivant</Button>
      </CardFooter>
    </Card>
  )
}

