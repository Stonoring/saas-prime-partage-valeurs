'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, FileSignature, FileCheck } from 'lucide-react'
import AccordForm from '@/components-redac-documents/accord-form'
import DecisionForm from '@/components-redac-documents/decision-form'
import LettreForm from '@/components-redac-documents/lettre-form'

export default function PPVInterface() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [lettreCount, setLettreCount] = useState(0)

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8">Rédigez automatiquement vos documents</h1>
        
        <div className="grid gap-6">
          <ActionBox
            title="Accord d'intéressement"
            icon={<FileText className="h-6 w-6 text-blue-500" />}
            isActive={activeSection === 'accord'}
            onClick={() => toggleSection('accord')}
          >
            <AccordForm />
          </ActionBox>

          <ActionBox
            title="Décision unilatérale"
            icon={<FileCheck className="h-6 w-6 text-purple-500" />}
            isActive={activeSection === 'decision'}
            onClick={() => toggleSection('decision')}
          >
            <DecisionForm />
          </ActionBox>

          <ActionBox
            title={`Lettre de versement (${lettreCount})`}
            icon={<FileSignature className="h-6 w-6 text-green-500" />}
            isActive={activeSection === 'lettre'}
            onClick={() => toggleSection('lettre')}
          >
            <LettreForm 
              onSubmit={() => {
                setLettreCount(prev => prev + 1)
                setActiveSection(null)
              }}
            />
          </ActionBox>
        </div>
      </div>
    </div>
  )
}

interface ActionBoxProps {
  title: string
  icon: React.ReactNode
  isActive: boolean
  onClick: () => void
  children: React.ReactNode
}

function ActionBox({ title, icon, isActive, onClick, children }: ActionBoxProps) {
  return (
    <Card className="overflow-hidden">
      <Button
        variant="ghost"
        className="w-full p-4 flex items-center justify-between text-left"
        onClick={onClick}
      >
        <div className="flex items-center space-x-4">
          {icon}
          <span className="font-semibold">{title}</span>
        </div>
        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ▼
        </motion.div>
      </Button>
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="p-4 border-t">
              {children}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

