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
    setData((prevData) => {
      const updatedData = { ...prevData, ...newData };
      return JSON.stringify(updatedData) !== JSON.stringify(prevData) ? updatedData : prevData;
    });
  };

  return (
    <SimulationContext.Provider value={{ data, updateData }}>
      {children}
    </SimulationContext.Provider>
  );
};

