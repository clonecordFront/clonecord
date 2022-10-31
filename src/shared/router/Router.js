import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/mainPage/MainPage';
import ChatPage from '../../pages/chatPage/ChatPage';
import LoginPage from '../../pages/loginPage/LoginPage';
import JoinPage from '../../pages/joinPage/JoinPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/channel/:id' element={<ChatPage />} />
        <Route path='/login' element={<LoginPage/>} />
        {/* <Route path='*' element={<MainPage />} /> */}
        <Route path="/join" element={<JoinPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;