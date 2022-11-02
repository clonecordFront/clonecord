import React from 'react';
import { createContext, useState } from 'react';

export const Darkmode = createContext();

export function DarkProvider({children}) {

  const [isDark, setIsDark] = useState(true);
  const toggleIsDark = () => {
    setIsDark((prev)=>!prev);
  };

  return (
    <Darkmode.Provider value={{isDark, toggleIsDark}}>
       {children}
    </Darkmode.Provider>
  );

}


// import React from 'react';
// import { createContext, useState } from 'react';

// export const UserDisplayContext = createContext();

// export function UserDisplayProvider({ children }) {
//   const [isUserDisplay, setIsUserDisplay] = useState(true);
//   const toggleIsUserDisplay = () => {
//     setIsUserDisplay((prev) => !prev);
//   };
//   return (
//     <UserDisplayContext.Provider value={{ isUserDisplay, toggleIsUserDisplay }}>
//       {children}
//     </UserDisplayContext.Provider>
//   );
// }