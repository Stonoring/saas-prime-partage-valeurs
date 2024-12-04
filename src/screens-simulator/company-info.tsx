import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/form/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckCircle, XCircle } from 'lucide-react';
import { useSimulation } from '@/contexts/SimulationContext';

interface CompanyInfoProps {
  onNext: () => void;
  onPrev: () => void;
}

export function CompanyInfo({ onNext, onPrev }: CompanyInfoProps) {
  const { data, updateData } = useSimulation();

  // Local state initialized from context
  const [employees, setEmployees] = useState(data.employees.toString());
  const [profits, setProfits] = useState(data.profits.toString());
  const [hasIncentive, setHasIncentive] = useState(data.hasIncentive ? 'yes' : 'no');

  // Derived state for validation
  const employeeNumber = parseInt(employees, 10) || 0;
  const isProfitsValid = profits !== '' && parseInt(profits, 10) > 0;
  const isObligatoryForEmployees = employeeNumber >= 11 && employeeNumber <= 49;
  const isValid = employees !== '' && isProfitsValid && hasIncentive !== null;

  // Handle "Suivant" click
  const handleNext = useCallback(() => {
    if (isValid) {
      const newData = {
        employees: employeeNumber,
        profits: parseInt(profits, 10),
        hasIncentive: hasIncentive === 'yes',
      };

      if (
        data.employees !== newData.employees ||
        data.profits !== newData.profits ||
        data.hasIncentive !== newData.hasIncentive
      ) {
        updateData(newData);
      }

      onNext();
    }
  }, [data, employeeNumber, profits, hasIncentive, updateData, onNext, isValid]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Dites-nous en plus sur votre entreprise</CardTitle>
        <CardDescription>
          Ces informations nous aideront à vérifier votre éligibilité et vos obligations liées au dispositif PPV.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Nombre de salariés */}
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
              {employees !== '' && <CheckCircle className="text-green-500" />}
            </div>
            {isObligatoryForEmployees && (
              <p className="text-yellow-500 text-sm">
                Les entreprises ayant entre 11 et 49 salariés ont une obligation de mettre en place un dispositif PPV.
              </p>
            )}
          </div>

          {/* Bénéfices */}
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

          {/* Dispositif d'intéressement */}
          <div className="space-y-2">
            <Label>Avez-vous déjà un dispositif d'intéressement ou de participation ?</Label>
            <RadioGroup value={hasIncentive} onValueChange={setHasIncentive}>
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
        <Button variant="outline" onClick={onPrev}>
          Précédent
        </Button>
        <Button onClick={handleNext} disabled={!isValid}>
          {isValid
            ? 'Votre entreprise semble éligible, passons à la suite'
            : 'Suivant'}
        </Button>
      </CardFooter>
    </Card>
  );
}
