import { createContext } from 'react';

interface SelectedCarContextType {
  selectedCar: number | undefined;
  setSelectedCar: React.Dispatch<React.SetStateAction<number | undefined>>;
  showSelected: boolean;
  setShowSelected: React.Dispatch<React.SetStateAction<boolean>>;
  showUpdate: boolean;
  setShowUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SelectedCarContext = createContext<SelectedCarContextType>({
  selectedCar: undefined,
  setSelectedCar: () => {},
  showSelected: false,
  setShowSelected: () => {},
  showUpdate: false,
  setShowUpdate: () => {},
});
