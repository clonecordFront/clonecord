import React from 'react';
import { createContext, useState } from 'react';

export const Darkmode = createContext();

export function DarkProvider({children}) {
  const [isDarkmode, setIsDarkmode] = useState(true);
  const toggleIsDarkmode = () => {
    setIsDarkmode((prev)=>!prev);
  };

  return (
    <Darkmode.Provider value={{isDarkmode, toggleIsDarkmode}}>
       {children}
    </Darkmode.Provider>
  );
}