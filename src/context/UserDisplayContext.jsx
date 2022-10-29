import React from 'react';
import { createContext, useState } from 'react';

export const UserDisplayContext = createContext();

export function UserDisplayProvider({ children }) {
  const [isUserDisplay, setIsUserDisplay] = useState(true);
  const toggleIsUserDisplay = () => {
    setIsUserDisplay((prev) => !prev);
  };
  return (
    <UserDisplayContext.Provider value={{ isUserDisplay, toggleIsUserDisplay }}>
      {children}
    </UserDisplayContext.Provider>
  );
}
