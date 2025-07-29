'use client';
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useState,
} from 'react';

type ContextValues = {
  isExpanded: boolean;
  setIsExpanded: Dispatch<React.SetStateAction<boolean>>;
};

const SidebarExpandableContext = createContext<ContextValues | undefined>(
  undefined
);

const SidebarExpandableProvider = ({ children }: { children: ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <SidebarExpandableContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </SidebarExpandableContext.Provider>
  );
};

const useSidebarExpandable = () => {
  const context = useContext(SidebarExpandableContext);
  if (context === undefined) {
    throw new Error(
      'useSidebarExpandable must be used within a SidebarExpandableProvider'
    );
  }
  return context;
};

export { SidebarExpandableProvider, useSidebarExpandable };
