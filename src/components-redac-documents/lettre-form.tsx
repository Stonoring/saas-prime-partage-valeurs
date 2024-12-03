'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/form/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LettreFormProps {
  onSubmit: () => void
}

export default function LettreForm({ onSubmit }: LettreFormProps) {
  const [formData, setFormData] = useState({
    nom: '',
    adresse: '',
    poste: '',
    contrat: '',
    anciennete: '',
    lieu: '',
    date: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="nom">Nom et prénom</Label>
          <Input
            id="nom"
            value={formData.nom}
            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="adresse">Adresse personnelle</Label>
          <Input
            id="adresse"
            value={formData.adresse}
            onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="poste">Poste occupé</Label>
          <Input
            id="poste"
            value={formData.poste}
            onChange={(e) => setFormData({ ...formData, poste: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contrat">Type de contrat</Label>
          <Select
            value={formData.contrat}
            onValueChange={(value) => setFormData({ ...formData, contrat: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cdi">CDI</SelectItem>
              <SelectItem value="cdd">CDD</SelectItem>
              <SelectItem value="alternance">Alternance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="anciennete">Ancienneté</Label>
          <Input
            id="anciennete"
            value={formData.anciennete}
            onChange={(e) => setFormData({ ...formData, anciennete: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lieu">Lieu</Label>
          <Input
            id="lieu"
            value={formData.lieu}
            onChange={(e) => setFormData({ ...formData, lieu: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        Rédiger
      </Button>
    </form>
  )
}

