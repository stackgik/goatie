import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface BottomSheetContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setContent: React.Dispatch<React.SetStateAction<ReactNode>>;
  content: ReactNode;
  openBottomSheet: (content: ReactNode) => void;
  closeBottomSheet: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
  undefined
);

const BottomSheetProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);

  const openBottomSheet = useCallback((content: ReactNode) => {
    setContent(content);
    setIsOpen(true);
  }, []);

  const closeBottomSheet = useCallback(() => {
    setIsOpen(false);
    setContent(null);
  }, []);

  return (
    <BottomSheetContext.Provider
      value={{
        isOpen,
        content,
        setIsOpen,
        setContent,
        openBottomSheet,
        closeBottomSheet,
      }}
    >
      {children}
    </BottomSheetContext.Provider>
  );
};

const useCustomBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error("useBottomSheet must be used within a BottomSheetProvider");
  }
  return context;
};

export { BottomSheetProvider, useCustomBottomSheet };
