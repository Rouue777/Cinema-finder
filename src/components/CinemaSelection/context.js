
import { createContext, useContext, useState } from 'react';

const CinemaSelectionContext = createContext(null);

export const CinemaSelectionProvider = ({ children }) => {
  const [selectedCinema, setSelectedCinema] = useState(null);

  return (
    <CinemaSelectionContext.Provider
      value={{ selectedCinema, setSelectedCinema }}
    >
      {children}
    </CinemaSelectionContext.Provider>
  );
};

export const useCinemaSelection = () => {
  const context = useContext(CinemaSelectionContext);

  if (!context) {
    throw new Error(
      'useCinemaSelection must be used within CinemaSelectionProvider'
    );
  }

  return context;
};
