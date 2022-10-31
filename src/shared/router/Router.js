import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/mainPage/MainPage';
import ChatPage from '../../pages/chatPage/ChatPage';
import Option from '../../components/option/Option';
import LoginPage from '../../pages/loginPage/LoginPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/channel/:id' element={<ChatPage />} />
        <Route path='/login' element={<LoginPage/>} />
        {/* <Route path='*' element={<MainPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;