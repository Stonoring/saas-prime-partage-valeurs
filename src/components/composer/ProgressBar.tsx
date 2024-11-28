import { Progress } from "@/components/ui/progress"

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="w-full">
      <Progress value={progress} className="w-full" />
      <p className="text-center mt-2">Étape {currentStep} sur {totalSteps}</p>
    </div>
  )
}

