import React from 'react';
import Router from './shared/router/Router';
import { StompProvider } from './context/StompContext';
import './App.module.css';

export default function App() {

  return (
      <StompProvider>
        <Router />
      </StompProvider>
  );
}
