import React, { useEffect } from 'react';
import Router from './shared/router/Router';
import { StompProvider } from './context/StompContext';
import './App.module.css';
import { DarkProvider } from './context/DarkmodeContext';
import { useDispatch } from 'react-redux';
import { restoreSession } from './redux/modules/NameSlice';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return (
    <StompProvider>
      <DarkProvider>
        <Router />
      </DarkProvider>
    </StompProvider>
  );
}
