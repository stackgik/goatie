'use client';

import { createContext, useContext, useState } from 'react';

type PasswordToggleContextType = {
  isVisible: (fieldId: string) => boolean;
  toggleVisibility: (fieldId: string) => void;
};

const PasswordToggleContext = createContext<PasswordToggleContextType | null>(
  null
);

// prettier-ignore
export function PasswordToggleProvider({ children }: {children: React.ReactNode}) {
  const [visibleFields, setVisibleFields] = useState<Record<string, boolean>>({});

  const toggleVisibility = (fieldId: string) => {
    setVisibleFields(prev => ({ ...prev, [fieldId]: !prev[fieldId] }));
  };

  const isVisible = (fieldId: string) => !!visibleFields[fieldId];

  return (
    <PasswordToggleContext.Provider value={{ isVisible, toggleVisibility }}>
      {children}
    </PasswordToggleContext.Provider>
  );
}

export function usePasswordToggle() {
  const context = useContext(PasswordToggleContext);
  if (!context) {
    throw new Error(
      'usePasswordToggle must be used within a PasswordToggleProvider'
    );
  }
  return context;
}
