'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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
  selectedNeeds?: { id: string; label: string }[];
  otherNeed?: string;
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
  selectedNeeds: [],
  otherNeed: '',
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
  const [data, setData] = useState<SimulationData>(() => {
    // Charger les données depuis localStorage
    const storedData = localStorage.getItem('simulationData');
    return storedData ? JSON.parse(storedData) : defaultSimulationData;
  });

  useEffect(() => {
    // Sauvegarder les données dans localStorage à chaque modification
    localStorage.setItem('simulationData', JSON.stringify(data));
  }, [data]);

  const updateData = (newData: Partial<SimulationData>) => {
    setData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <SimulationContext.Provider value={{ data, updateData }}>
      {children}
    </SimulationContext.Provider>
  );
};