'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/form/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export default function DecisionForm() {
  return (
    <form className="space-y-6">
      <div className="space-y-4">
        <Label>Salariés concernés</Label>
        <RadioGroup defaultValue="plafond">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="plafond" id="plafond" />
            <Label htmlFor="plafond">
              Prime avec plafond de rémunération
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sans_plafond" id="sans_plafond" />
            <Label htmlFor="sans_plafond">
              Prime sans plafond de rémunération
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label>Montant</Label>
        <RadioGroup defaultValue="fixe">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="fixe" id="fixe" />
            <Label htmlFor="fixe">
              Montant fixe pour tous les salariés
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="module" id="module" />
            <Label htmlFor="module">
              Montant modulé
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="criteres">Critères de modulation</Label>
        <Textarea
          id="criteres"
          placeholder="Entrez les critères de modulation..."
        />
      </div>

      <Button type="submit" className="w-full">
        Soumettre
      </Button>
    </form>
  )
}

