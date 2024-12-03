import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/form/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle, XCircle } from 'lucide-react'
import { useSimulation } from '@/contexts/SimulationContext'

export function CompanyInfo({ onNext, onPrev }: { onNext: () => void, onPrev: () => void }) {
  const { data, updateData } = useSimulation();
  const [employees, setEmployees] = useState(data.employees.toString())
  const [profits, setProfits] = useState(data.profits.toString())
  const [hasIncentive, setHasIncentive] = useState<string | null>(data.hasIncentive ? 'yes' : 'no')

  const employeeNumber = parseInt(employees, 10)
  const isEmployeesValid = employeeNumber >= 11 && employeeNumber <= 49
  const isProfitsValid = profits !== '' && parseInt(profits) > 0
  const isValid = isEmployeesValid && isProfitsValid && hasIncentive !== null

  useEffect(() => {
    updateData({
      employees: employeeNumber,
      profits: parseInt(profits),
      hasIncentive: hasIncentive === 'yes'
    })
  }, [employees, profits, hasIncentive, updateData])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Dites-nous en plus sur votre entreprise</CardTitle>
        <CardDescription>Ces informations nous aideront à vérifier votre éligibilité.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="employees">Nombre de salariés</Label>
            <div className="flex items-center space-x-2">
              <Input 
                id="employees" 
                type="number" 
                value={employees} 
                onChange={(e) => setEmployees(e.target.value)}
                min={0}
              />
              {employees !== '' && (
                isEmployeesValid ? <CheckCircle className="text-green-500" /> : <XCircle className="text-red-500" />
              )}
            </div>
            {!isEmployeesValid && employees !== '' && (
              <p className="text-red-500 text-sm">Le nombre de salariés doit être compris entre 11 et 49.</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="profits">Moyenne des bénéfices des 3 derniers exercices (en €)</Label>
            <div className="flex items-center space-x-2">
              <Input 
                id="profits" 
                type="number" 
                value={profits} 
                onChange={(e) => setProfits(e.target.value)}
                min={0}
              />
              {profits !== '' && (
                isProfitsValid ? <CheckCircle className="text-green-500" /> : <XCircle className="text-red-500" />
              )}
            </div>
            {!isProfitsValid && profits !== '' && (
              <p className="text-red-500 text-sm">Les bénéfices doivent être supérieurs à 0 €.</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Avez-vous déjà un dispositif d'intéressement ou de participation ?</Label>
            <RadioGroup value={hasIncentive || ''} onValueChange={setHasIncentive}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes">Oui</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no">Non</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>Précédent</Button>
        <Button onClick={onNext} disabled={!isValid}>
          {isValid 
            ? "Votre entreprise semble éligible, passons à la suite" 
            : "Suivant"
          }
        </Button>
      </CardFooter>
    </Card>
  )
}

