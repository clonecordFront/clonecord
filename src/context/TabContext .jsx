import React from 'react';
import { createContext, useState } from 'react';

export const TabContext = createContext();

export function TabProvider({ children }) {
  const [tab, setTab] = useState(0);

  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
}
