import React from 'react';

import Room from './room/Room';
// import SockJS from 'sockjs-client';
// import { over } from 'stompjs';

import Layout from '../../components/common/layout/Layout';

export default function ChatPage(props) {
  return (
    <Layout>
      <Room />
    </Layout>
  );
}
