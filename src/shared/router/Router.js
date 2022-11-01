import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/mainPage/MainPage';
import ChatPage from '../../pages/chatPage/ChatPage';
import InvitePage from '../../pages/invitePage/InvitePage';
import Temp from '../../components/temp/temp';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/temp' element={<Temp />} />
        <Route path='/channel/:id' element={<ChatPage />} />
        <Route path='/invite/:id' element={<InvitePage />} />

        {/* <Route path='*' element={<MainPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
