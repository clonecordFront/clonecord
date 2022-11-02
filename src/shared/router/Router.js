import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import MainPage from '../../pages/mainPage/MainPage';
import ChatPage from '../../pages/chatPage/ChatPage';
import InvitePage from '../../pages/invitePage/InvitePage';
import Mode from '../../components/option/mode/Mode';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />

        <Route element={<PrivateRoute />}>
          <Route path='/channel/:id' element={<ChatPage />} />
          <Route path='/invite/:id' element={<InvitePage />} />
        </Route>

        {/* <Route path='*' element={<MainPage />} /> */}
        {/* <Route path='/join' element={<JoinPage />} /> */}
        <Route path='/mode' element={<Mode />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
