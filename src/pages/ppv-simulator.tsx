'use client'

import { useState } from 'react'
import { Progress } from "@/components/ui/progress"
import { Welcome } from '@/screens-simulator/welcome'
import { Needs } from '@/screens-simulator/needs'
import { CompanyInfo } from '@/screens-simulator/company-info'
import { PrimeModeling } from '@/screens-simulator/prime-modeling'
import { Impact } from '@/screens-simulator/impact'
import { Summary } from '@/screens-simulator/summary'
import { SimulationProvider } from '@/contexts/SimulationContext'

const screens = [Welcome, Needs, CompanyInfo, PrimeModeling, Impact, Summary]

export default function PPVSimulator() {
  const [currentScreen, setCurrentScreen] = useState(0)

  const nextScreen = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1)
    }
  }

  const prevScreen = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1)
    }
  }

  const CurrentScreenComponent = screens[currentScreen]

  return (
    <SimulationProvider>
      <div className="container mx-auto p-4 max-w-4xl">
        <Progress value={(currentScreen / (screens.length - 1)) * 100} className="mb-8" />
        <CurrentScreenComponent onNext={nextScreen} onPrev={prevScreen} />
      </div>
    </SimulationProvider>
  )
}

