// src/contexts/SimulationContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SimulationData {
  employees: number;
  profits: number;
  hasIncentive: boolean;
  totalAmount: number;
  distributionCriteria: 'equal' | 'weighted';
  criteriaWeights: {
    seniority: number;
    classification: number;
    workTime: number;
  };
  selectedNeeds?: { id: string; label: string }[]; // Ajout de selectedNeeds
  otherNeed?: string; // Ajout de otherNeed
}

interface SimulationContextType {
  data: SimulationData;
  updateData: (newData: Partial<SimulationData>) => void;
}

const defaultSimulationData: SimulationData = {
  employees: 0,
  profits: 0,
  hasIncentive: false,
  totalAmount: 0,
  distributionCriteria: 'equal',
  criteriaWeights: {
    seniority: 33,
    classification: 33,
    workTime: 34,
  },
  selectedNeeds: [], // Initialisation de selectedNeeds
  otherNeed: '', // Initialisation de otherNeed
};

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};

export const SimulationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SimulationData>(defaultSimulationData);

  const updateData = (newData: Partial<SimulationData>) => {
    setData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <SimulationContext.Provider value={{ data, updateData }}>
      {children}
    </SimulationContext.Provider>
  );
};
