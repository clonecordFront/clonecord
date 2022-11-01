import React from 'react';

// import SockJS from 'sockjs-client';
// import { over } from 'stompjs';
import Room from './room/Room';
import Layout from '../../components/common/layout/Layout';
import { UserDisplayProvider } from '../../context/UserDisplayContext';
import { useParams } from 'react-router-dom';

export default function ChatPage() {
  const { id } = useParams();

  return (
    <Layout>
      <UserDisplayProvider>
        <Room roomId={id} />
      </UserDisplayProvider>
    </Layout>
  );
}
