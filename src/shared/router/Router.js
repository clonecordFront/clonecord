import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/mainPage/MainPage';
import ChatPage from '../../pages/chatPage/ChatPage';
import Option from '../../components/option/Option';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/chat' element={<ChatPage />} />
        <Route path='/option' element={<Option />} />
        {/* <Route path='*' element={<MainPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;