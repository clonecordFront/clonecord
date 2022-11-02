import React from 'react';
import Router from './shared/router/Router';
import { StompProvider } from './context/StompContext';
import './App.module.css';
import { DarkProvider } from './context/DarkmodeContext';

export default function App() {

  return (
      <StompProvider>
        <DarkProvider>
          <Router />
        </DarkProvider>
      </StompProvider>
  );
}
