import React from 'react'
import { createContext, useContext, useState } from 'react'

export const ModeText = createContext()

export default function ModeTextProvider({chidren}) {
  const [textTheme, setTextTheme] = useState('Light');
  const values = {textTheme, setTextTheme}
  return(
    <ModeText.Provider value={values}>
      {chidren}
    </ModeText.Provider>
  )
}
export const useModeText = () => {
  const context = useContext(ModeText)
  return context
}
